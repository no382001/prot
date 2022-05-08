<?php

if(isset($_POST["query"]))
{
	$connect = new PDO("mysql:host=localhost; dbname=words", "test", "password");

	$data = array();

	//since we have no special query

	//$condition = preg_replace('/[^A-Za-z0-9\- ]/', '', $_POST["query"]); //prevent sql injection
	//$condition = trim($condition);
	//$condition = str_replace(" ", "%", $condition);

	$query = "SELECT * FROM main";
	$statement = $connect->prepare($query);
	$statement->execute();
	$result = $statement->fetchAll();
	
	foreach($result as $row)
	{
		$data[] = array(
			'id'			=>	$row["id"],
			'word'			=>	$row["word"],
			'lemma'			=>	$row["lemma"],
			'pos'			=>	$row["pos"],
			'features'		=>	$row["features"]
		);
	}
	echo json_encode($data);
}

?>