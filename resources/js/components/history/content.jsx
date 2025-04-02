import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../../../../public/static/img/logo.png";
import ModalDetailLoker from "./modal";

export default function Content() {
  const [activeTab, setActiveTab] = useState("pending");
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState({ open: false, id: null });

  const getData = async (page = 1) => {
    try {
      const response = await axios.get(`${appUrl}/v1/file-apply/get-history-by-user?page=${page}&search=${activeTab}`);
      const responseData = response.data;
      console.log(responseData);
      setData(responseData.data.data);
      setPagination({
        current_page: responseData.data.current_page,
        last_page: responseData.data.last_page,
        next_page_url: responseData.data.next_page_url,
        prev_page_url: responseData.data.prev_page_url,
        total: responseData.data.total,
      });
      setCurrentPage(responseData.data.current_page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      getData(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      getData(currentPage - 1);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  //status lamaran
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="text-sm text-yellow-600 bg-yellow-100 rounded-full px-2">
            Proses Verifikasi
          </span>
        );
      case "rejected":
        return (
          <span className="text-sm text-red-600 bg-red-100 rounded-full px-2">
            Ditolak
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">History Apply Pekerjaan</h1>
          <p className="text-gray-600 mt-1">Pantau status lamaran pekerjaan Anda</p>
        </div>

        <div className="p-4 bg-gray-50 border-b">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "pending" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Verifikasi berkas
            </button>
            <button 
              onClick={() => setActiveTab("interview")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "interview" 
                  ? "bg-yellow-500 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Interview
            </button>
            <button 
              onClick={() => setActiveTab("diterima")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "diterima" 
                  ? "bg-green-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Diterima
            </button>
          </div>
        </div>

        {/* Application List */}
        <div className="divide-y">
          {data.length > 0 ? (
            data.map((application) => (
              <div key={application.id} className="p-6 flex items-center hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={logo}
                    alt={application.company}
                    className="h-16 w-16 rounded-md object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{application.job.name}</h3>
                  <p className="text-gray-600">{application.company}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Diapply pada: {new Date(application.created_at).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",  
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="ml-4 flex flex-col items-end space-y-2">
                  {/* {getStatusBadge(application.status)} */}
                  {getStatusBadge(application.status)}
                  <button   onClick={() => setIsModalOpen({open: true, id:application.id})} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-4xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">Tidak ada data</h3>
              <p className="text-gray-500">Tidak ada lamaran pekerjaan yang sesuai dengan filter yang dipilih.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Total lamaran {pagination.total}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={!pagination.prev_page_url}
              className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              onClick={handleNextPage}
              disabled={!pagination.next_page_url}
              className="px-3 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <ModalDetailLoker isOpen={isModalOpen.open} onClose={() => setIsModalOpen(false)}     applicationId={isModalOpen.id} />}
    </div>
  );
}
