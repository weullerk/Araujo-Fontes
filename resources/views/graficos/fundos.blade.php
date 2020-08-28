@extends('layout')
@section('title', 'Gráfico Fundos')
@section('description', 'Gráfico de Fundos')
<style>
    canvas{
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>

@section('content')
 <div class="container">
     <h1>Fundos</h1>
     <form class="form-inline" id="filtrarGrafico" method="post">
        <div class="form-group">
            <label for="dataInicial">Data Inicial:</label>
            <input type="date" name="dataInicial" id="dataInicial">
        </div>

         <div class="form-group ml-2">
             <label for="dataInicial">Data Final:</label>
             <input type="date" name="dataFinal" id="dataFinal">
         </div>
         <button class="btn btn-primary ml-2" type="submit">Filtrar data</button>
     </form>

     <canvas id="canvas"></canvas>
 </div>

@endsection

@section('scripts')
<script src="{{ URL::asset('assets/js/pages/fundo.js' )}}"></script>
@endsection
