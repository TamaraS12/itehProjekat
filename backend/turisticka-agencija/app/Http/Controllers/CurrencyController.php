<?php

namespace App\Http\Controllers;

class CurrencyController extends Controller
{

    public function convertValue(string $currency, int $value)
    {
        $api_id = '0efb60ac1992080a4cd6983a7a0f41f0';
        $url = 'https://api.kursna-lista.info/'.$api_id.'/konvertor/rsd/'.$currency.'/'.$value;
        $content = file_get_contents($url);
        
        if (empty($content)) {
            die('Greška u preuzimanju podataka');
        }
        
        $data = json_decode($content, true);

        return $data;
    }
}

