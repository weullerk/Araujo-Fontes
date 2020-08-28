<?php

namespace App\Http\Controllers\Graficos;

use App\Http\Controllers\Controller;
use App\Model\Fundo;
use App\Model\Patrimonio;
use Carbon\Carbon;

class FundosController extends Controller
{
    public function listFundos() {
        return response()->json(Fundo::all());
    }

    public function listPatrimonios($dataInicial, $dataFinal) {
        return response()->json(
            Patrimonio::whereBetween('date', [Carbon::parse($dataInicial), Carbon::parse($dataFinal)])->get()
        );
    }

    public function listPatrimoniosWithoutDate() {
        return response()->json(
            Patrimonio::whereBetween('date', [Carbon::now()->sub('7 days'), Carbon::now()])->get()
        );
    }

    public function show() {
        return view('graficos.fundos');
    }
}
