#!/usr/bin/env php
<?php
/**
 * To generate div like: <div class="brick small"><img src="portrait/Parents/Female/Aqua.png"></img></div>
 */

$portrait_folder = $argv[1];

$folder = __DIR__ . '/../portrait/' . $portrait_folder . '/';
$files = glob($folder . '*.png');

foreach ($files as $file) {
	$filename = basename($file);

	$src = "portrait/{$portrait_folder}/{$filename}";
	echo '<img class="candidate" id="' . rtrim($filename, '.png') . '" draggable="true" ondragstart="drag(event)" src="' . $src . '"></img>' . PHP_EOL;
}