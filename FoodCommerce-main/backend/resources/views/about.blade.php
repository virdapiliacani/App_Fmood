@extends('layouts.main')
@section('container')
    <h1>About Me</h1>
    <h3>Name : {{ $name }}</h3>
    <h3>Email : {{ $email }}</h3>
    <img src="{{ $image }}" alt="its and image" width="200px">
@endsection