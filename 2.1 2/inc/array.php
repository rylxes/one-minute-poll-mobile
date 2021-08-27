<!DOCTYPE html>
<html>
<body>

<?php
$data = serialize(array(
	"A" => "Strongly Agreed", 
    "B" => "Agreed", 
    "C" => "Nuetral", 
    "D" => "Opposed", 
    "E" => "Strongly Opposed"
   )
  );
echo $data;


$data = serialize(array(
			array('id' => 1, 'poll_type' => 'true_false', 'desc' => 'True or False'),
			array('id' => 2, 'poll_type' => '5_star_rating', 'desc' => '5 Star Rating'),
			array('id' => 3, 'poll_type' => 'multiple_choice_single_answer', 'desc' => 'Multiple Choice, Single Answer'),
			array('id' => 4, 'poll_type' => 'multiple_choice_multiple_answer', 'desc' => 'Multiple Choice, Multiple Answer'),
		)
	);
?>

</body>
</html>
