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
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (page = 1, tab = activeTab) => {
    try {
      setIsLoading(true);
      // Clear previous data while loading
      setData([]);

      let apiUrl = `${appUrl}/v1/file-apply/get-history-by-user?page=${page}&search=${tab}`;

      if (tab === 'interview') {
        apiUrl = `${appUrl}/v1/file-apply/get-interview-history?page=${page}`;
      }

      const response = await axios.get(apiUrl);
      const responseData = response.data;

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
      // Set empty data in case of error
      setData([]);
      setPagination({
        current_page: 1,
        last_page: 1,
        next_page_url: null,
        prev_page_url: null,
        total: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      getData(currentPage + 1, activeTab);
    }
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      getData(currentPage - 1, activeTab);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  useEffect(() => {
    // Call API based on activeTab whenever the tab changes
    getData(1, activeTab);
  }, [activeTab]);

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
              onClick={() => handleTabChange("pending")}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "pending"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              Verifikasi berkas
            </button>
            <button
              onClick={() => handleTabChange("interview")}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "interview"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              Interview
            </button>
            <button
              onClick={() => handleTabChange("diterima")}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "diterima"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              Diterima
            </button>
          </div>
        </div>

        {/* Application List with Loading State */}
        <div className="divide-y">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data...</p>
            </div>
          ) : data && data.length > 0 ? (
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
                  {getStatusBadge(application.status)}
                  <button onClick={() => setIsModalOpen({ open: true, id: application.id })} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-4xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">Tidak ada data</h3>
              <p className="text-gray-500">
                {activeTab === "pending" && "Tidak ada lamaran yang sedang dalam proses verifikasi."}
                {activeTab === "interview" && "Tidak ada lamaran yang sedang dalam tahap interview."}
                {activeTab === "diterima" && "Tidak ada lamaran yang telah diterima."}
              </p>
            </div>
          )}
        </div>

        {/* Pagination - Only show when data exists */}
        {data && data.length > 0 && (
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
        )}
      </div>
      {isModalOpen.open && <ModalDetailLoker isOpen={isModalOpen.open} onClose={() => setIsModalOpen({ open: false, id: null })} applicationId={isModalOpen.id} />}
    </div>
  );
}