
<?php
    try {
        if($_SERVER["REQUEST_METHOD"] === "POST") {
            $obj = json_decode($_POST["myData"]);
            $fname = $obj->FName;
            $lname = $obj->LName;
            $age = $obj->Age;
            $address = $obj->Address;
            $gender = $obj->Gender;

            $namePattern = "/^[A-Za-z\-'.\s]{2,50}$/";
            $agePattern = "/^[0-9]{1,2}$/"; 

            if (empty($fname)) {
                echo "First Name is required.";
                exit;
            } else if (!preg_match($namePattern, $fname)) {
                echo "First Name should only contain letters.";
                exit;
            }
    
            if (empty($lname)) {
                echo "Last Name is required.";
                exit;
            } else if (!preg_match($namePattern, $lname)) {
                echo "Last Name should only contain letters.";
                exit;
            } else {
                $firstLetter = strtoupper ($lname[0]);
            }
    
            if (empty($age)) {
                echo "Age is required.";
                exit;
            } else if (!preg_match($agePattern, $age)) {
                echo "Age should only contain numbers.";
                exit;
            }

            if (empty($address)) {
                echo "Address is required.";
                exit;
            }
            
            if ($gender === "Male") {
                if ($firstLetter >= "A" && $firstLetter <= "M") {
                    $class = "Class A";
                } else {
                    $class = "Class C";
                }
            } else if ($gender === "Female") {
                if ($firstLetter >= "A" && $firstLetter <= "M") {
                    $class = "Class D";
                } else {
                    $class = "Class B";
                }
            } else {
                echo "No gender selected";
                exit;
            }

            $response = "Name: $fname $lname   |   ";
            $response .= "Age: $age   |   ";
            $response .= "Gender: $gender   |   ";
            $response .= "Section: $class";
            
            echo $response;
            exit;
        }
    } catch(Exception $e) {
        echo "An error occurred: " . $e->getMessage();
        exit;
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="Style.css"/>
        <title>UST S.I.F</title>
    </head>
    
    <body>
        <div class="video-bg">
        <video class="background-video" autoplay muted loop playsinline>
        <source src="videos/UST Montage1080.mp4" type="video/mp4">
        </video>
        <!-- sticky Header -->
        <header class="sticky-header">
            <div class="header-content">
                <div class="logo-container">
                    <img src="images/USTLogo.png" alt="UST Logo" class="ust-logo">  
        </header>

        <!-- main Content Area -->
        <div class="main-container-fluid">
            <!-- Left Side Content -->
            <div class="left-content">
                <h1>University of Santo Tomas</h1>
                <p class="subtitle">España, Manila, Philippines</p>
                <div class="university-info">
                    <p>The University of Santo Tomas, established in 1611, is Asia's oldest existing university.</p>
                    <p>Through the centuries, the University has become the center of learning in the Philippines.</p>
                </div>
            </div>

            <!-- right Side Form -->
            <div class="form-card">
                <div class="logo-header">
                    <img src="images/TigerCard.png" alt="Tiger Logo" class="tiger-logo">
                    <h2>Student Identification Form</h2>
                </div>
                
                <p class="description">
                    A tool for registered students and faculty to quickly view a student's 
                    assigned section.
                </p>

                <form id="studentForm">
                    <div class="input-group">
                        <i class="far fa-user"></i>
                        <input type="text" id="Fname" name="Fname" placeholder="First Name" />
                    </div>

                    <div class="input-group">
                        <i class="far fa-user"></i>
                        <input type="text" id="Lname" name="Lname" placeholder="Last Name" />
                    </div>

                    <div class="input-group">
                        <i class="fas fa-map-marker-alt"></i>
                        <input type="text" id="address" name="address" placeholder="Address" />
                    </div>

                    <div class="input-group">
                    <i class="fa-solid fa-cake-candles"></i>
                        <input type="number" id="age" name="age" placeholder="Age" min="1" max="99"/>
                    </div>

                    <div class="gender-group">
                        <i class="fas fa-venus-mars"></i>
                        <div class="radio-options">
                            <input type="radio" id="male" name="gender" value="Male">
                            <label for="male">Male</label>
                            <input type="radio" id="female" name="gender" value="Female">
                            <label for="female">Female</label>
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>

        <!-- footer -->
        <footer class="footer-scrollable">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>About UST</h3>
                    <p>The University of Santo Tomas continues its tradition of academic excellence 
                       through research, innovation, and community service. As a pontifical university, 
                       it remains committed to the highest ideals of Catholic education.</p>
                </div>

                <div class="footer-section">
                    <h3>Meet the devs  <i class="far fa-user"></i></h3>
                    <ul>
                        <li>Johann Agpasa</a></li>
                        <li>Dom Espiritu</a></li>
                        <li>Angelo Fernandez</a></li>
                        <li>Arvey Chan</a></li>
                        <li>Abraham Villamin</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Contact Information</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> España Blvd, Sampaloc, Manila</li>
                        <li><i class="fas fa-phone"></i> +63 1 1234 5678</li>
                        <li><i class="fas fa-envelope"></i> info@ust.edu.ph</li>
                        <li><i class="fas fa-clock"></i> Monday - Friday: 8:00 AM - 5:00 PM</li>
                        <li><i class="fas fa-globe"></i> www.ust.edu.ph</li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Connect With Us</h3>
                    <div class="social-links">
                        <a href="#" title="Facebook"><i class="fab fa-facebook"></i></a>
                        <a href="#" title="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                    <div class="newsletter">
                        <h4>Subscribe to Newsletter</h4>
                        <div class="newsletter-form">
                            <input type="email" placeholder="Enter your email">
                            <button type="button">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-logo">
                    <img src="images/TigerFooter.png" alt="UST Logo" class="footer-logo-img">
                </div>
                <p class="copyright">© 2025 University of Santo Tomas. All rights reserved.</p>
            </div>
        </footer>
        <script src="script.js"></script>
</body>