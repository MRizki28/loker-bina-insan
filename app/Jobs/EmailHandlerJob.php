<?php

namespace App\Jobs;

use App\Mail\LokerMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class EmailHandlerJob implements ShouldQueue
{
    use Queueable;

    public $message;
    public $email;
    /**
     * Create a new job instance.
     */
    public function __construct($message, $email)
    {
        $this->message = $message;
        $this->email = $email;
    }


    /**
     * Execute the job.
     */
    public function handle(): void
    {

        Mail::to($this->email)->send(new LokerMail($this->message));
    }
}
