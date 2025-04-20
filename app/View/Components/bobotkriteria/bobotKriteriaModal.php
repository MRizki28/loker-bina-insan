<?php

namespace App\View\Components\bobotkriteria;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class bobotKriteriaModal extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.bobotkriteria.bobot-kriteria-modal');
    }
}
