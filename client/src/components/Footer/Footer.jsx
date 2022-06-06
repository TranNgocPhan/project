import React from 'react';

function Footer( { custom } ) {

    return (
        <footer class="footer section bg-dark" style={custom && custom}>
	        <div class="container">
                <div class="row">
                    <div class="col-lg-4 mr-auto col-sm-6">
                        <div class="widget mb-5 mb-lg-0">
                            <div class="logo mb-4 text-white">
                                WIBU MEDICAL
                                <img src="" alt="" class="img-fluid" />
                            </div>
                            <p class="text-white">Phục vụ bạn là niềm hạnh phúc của chúng tôi</p>
                            <ul class="list-inline footer-socials mt-4">
                                <li class="list-inline-item"><a href="https://www.facebook.com/themefisher"><i class="icofont-facebook"></i></a></li>
                                <li class="list-inline-item"><a href="https://twitter.com/themefisher"><i class="icofont-twitter"></i></a></li>
                                <li class="list-inline-item"><a href="https://www.pinterest.com/themefisher/"><i class="icofont-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>					
                    <div class="footer-btm py-4 mt-5">			
                        <div class="row">
                            <div class="col-lg-4">
                                
                            </div>
                        </div>
                    </div>
	            </div>
            </div>
        </footer>
    )
}

export default Footer;