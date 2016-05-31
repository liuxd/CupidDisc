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
	echo '<div class="brick small"><img src="portrait/' . $portrait_folder . '/' . $filename . '"></img></div>' . PHP_EOL;
}