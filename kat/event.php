<?php

$today = new DateTime(); /* defaults to "now" */

function dateConvertion($date) {
    $parts = explode('-', $date);

    if (count($parts) !== 3) {
        // Handle invalid date format
        return [
            'month' => '',
            'day'   => '',
            'week'  => ''
        ];
    }

    list($year, $month, $day) = $parts;
    $week = date('w', strtotime($date));
    $day = $day . "日";

    switch ($month) {
        case  1: $month = "1月"; break;
        case  2: $month = "2月"; break;
        case  3: $month = "3月"; break;
        case  4: $month = "4月"; break;
        case  5: $month = "5月"; break;
        case  6: $month = "6月"; break;
        case  7: $month = "7月"; break;
        case  8: $month = "8月"; break;
        case  9: $month = "9月"; break;
        case 10: $month = "10月"; break;
        case 11: $month = "11月"; break;
        case 12: $month = "12月"; break;
    }

    switch ($week) {
        case  0: $week = "(日)"; break;
        case  1: $week = "(月)"; break;
        case  2: $week = "(火)"; break;
        case  3: $week = "(水)"; break;
        case  4: $week = "(木)"; break;
        case  5: $week = "(金)"; break;
        case  6: $week = "(土)"; break;
    }

    return [
        'month' => $month,
        'day'   => $day,
        'week'  => $week,
    ];
}


for ($i = 0; $i < count($event); $i++) {

    $ids = explode('|', $event[$i]['id']);
    if ((in_array($artist, $ids) || $artist === "all") && (strtotime($event[$i]['date']) >= strtotime(date('Y-m-d')))) {

        $start = dateConvertion($event[$i]['date']);
        $smonth = $start['month'];
        $sday   = $start['day'];
        $sweek  = $start['week'];

        $end = dateConvertion($event[$i]['enddate']);
        $emonth = $end['month'];
        $eday   = $end['day'];
        $eweek  = $end['week'];

        $url = $event[$i]['url'];
        $icon = $event[$i]['button'];

        if($event[$i]['soldout']) { $soldout = " data-tag=\"soldout\""; } else { $soldout = ""; }
        if (empty($event[$i]['enddate'])) {
            $continue = "";
            $emonth = "";
            $eday   = "";
            $eweek  = "";
        } else {
            $continue = " ~";
            $end = dateConvertion($event[$i]['enddate']);
            $emonth = $end['month'];
            $eday   = $end['day'];
            $eweek  = $end['week'];
        }

echo <<<HTML
    <div class="col-12 col-md-4 mb_64 article d-flex">
        <div class="event d-flex flex-column align-self-end justify-content-between">
            <a href="" class="hover-opacity d-flex" style="pointer-events:none;">
                <img src="{$event[$i]['image']}" width="100%" class="hover-opacity">
            </a>
            <div class="d-flex flex-column align-self-end" style="width: 100%;">
                <h6 class="artist">{$event[$i]['artist']}</h6>
                <h2 class="title">{$event[$i]['title']}</h2>
                <p class="description">{$event[$i]['description']}</p>
                <p style="font-size: .75rem; color: #777;">
                    <i class="fa fa-map-marker"></i> {$event[$i]['country']}、 {$event[$i]['city']}<br>
                    <i class="fa fa-map-location-dot"></i> {$event[$i]['place']}<br>
                    <i class="fa fa-calendar"></i> $smonth $sday $sweek $continue<span style="position: absolute; left: 65%;"><i class="fa fa-clock"></i> {$event[$i]['start']}</span><br>
                    <i></i> $emonth $eday $eweek<span style="position: absolute; left: 65%;"><i></i> {$event[$i]['end']}</span><br>
                </p>
                <a href="{$event[$i]['url']}" targer="_blank">
                    詳細はこちら
                    <i class="fa-solid fa-angles-right" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    </div>
HTML;
    }
}
?>