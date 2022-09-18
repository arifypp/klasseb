<template>
  <div id="app">
    <Loader />
  <!-- App Header -->
    <Header />
  <!-- * App Header -->

  <!-- Search Component -->
  <div id="search" class="appHeader" v-if="$store.state.isLoggedIn">
    <form class="search-form">
        <div class="form-group searchbox">
            <input type="text" class="form-control" placeholder="Search...">
            <i class="input-icon">
                <ion-icon name="search-outline"></ion-icon>
            </i>
            <a href="javascript:;" class="ml-1 close toggle-searchbox">
                <ion-icon name="close-circle"></ion-icon>
            </a>
        </div>
    </form>
  </div>
  <!-- * Search Component -->

    <router-view />

  <!-- App Bottom Menu -->
    <Footer />
  <!-- * App Bottom Menu -->

  <!-- App Sidebar -->
    <Sidebar />
  <!-- * App Sidebar -->

  </div>
</template>

<script>
import Loader from "./components/Loader.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: 'App',
  data() {
    return {};
  },
  async created() {
    const isValid = await this.$store.dispatch('checkLoginState');

    if (!isValid) {
      this.$router.push({
        name: 'UserLogin',
        query: {
          redirectTo: this.$route.name,
          message: 'Your session has expired. Please login again'
        },
      });
    }
  },

  components : {
        Loader,
        Header,
        Footer,
        Sidebar
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
  mounted: function () {
    // Page Loader with preload
    jQuery(document).ready(function () {
        setTimeout(() => {
            jQuery("#loader").fadeToggle(250);
        }, 700); // hide delay when page load
        // Add Active Class when Scroll page
        jQuery(window).scroll(function() {    
            var scroll = jQuery(window).scrollTop();

            if (scroll >= 1) {
                jQuery(".appHeader").addClass("is-active");
            } else {
                jQuery(".appHeader").removeClass("is-active");
            }
        });
    });
    
    
    // Fix for # href
    jQuery('a[href="#"]').click(function (e) {
        e.preventDefault();
    })
        
    // Go Top Button
    jQuery(".goTop").click(function (event) {
        event.preventDefault();
        jQuery("html, body").animate({ scrollTop: 0 }, "slow");
    });
    function goDownButton() {
        var scrollD = jQuery(this).scrollTop();
        if (scrollD > 350) {
            jQuery(".goTop.button").addClass("show");
        } else {
            jQuery(".goTop.button").removeClass("show");
        }
    }
    goDownButton();
    jQuery(window).scroll(function () {
        goDownButton();
    });
    
    
    // Go Back Button
    jQuery(".goBack").click(function () {
        window.history.go(-1);
    });
        
    // Adbox Close
    jQuery(".adbox .closebutton").click(function () {
        jQuery(this).parent(".adbox").addClass("hide");
    });
    jQuery(document).ready(function () {    
    // OS Detection
    var osDetection = navigator.userAgent || navigator.vendor || window.opera;
    var windowsPhoneDetection = /windows phone/i.test(osDetection);
    var androidDetection = /android/i.test(osDetection);
    var iosDetection = /iPad|iPhone|iPod/.test(osDetection) && !window.MSStream;

    if (windowsPhoneDetection) {
        // Windows Phone Detected
        jQuery(".windowsphone-detection").addClass("is-active");
        jQuery(".mobile-detection").addClass("is-active");
    }
    else if (androidDetection) {
        // Android Detected
        jQuery(".android-detection").addClass("is-active");
        jQuery(".mobile-detection").addClass("is-active");
    }
    else if (iosDetection) {
        // iOS Detected
        jQuery(".ios-detection").addClass("is-active");
        jQuery(".mobile-detection").addClass("is-active");
    }
    else {
        // Non-Mobile Detected
        jQuery(".non-mobile-detection").addClass("is-active");

    }
});   

    
    // Tooltip
    jQuery(function () {
        jQuery('[data-toggle="tooltip"]').tooltip()
    })
    
    // Input
    jQuery(".clear-input").click(function () {
        jQuery(this).parent(".input-wrapper").find(".form-control").focus();
        jQuery(this).parent(".input-wrapper").find(".form-control").val("");
        jQuery(this).parent(".input-wrapper").removeClass("not-empty");
    });
    // active
    jQuery(".form-group .form-control").focus(function () {
        jQuery(this).parent(".input-wrapper").addClass("active");
    }).blur(function () {
        jQuery(this).parent(".input-wrapper").removeClass("active");
    })
    // empty check
    jQuery(".form-group .form-control").keyup(function () {
        var inputCheck = jQuery(this).val().length;
        if (inputCheck > 0) {
            jQuery(this).parent(".input-wrapper").addClass("not-empty");
        }
        else {
            jQuery(this).parent(".input-wrapper").removeClass("not-empty");
        }
    });
    
    
    // Searchbox Toggle
    jQuery(".toggle-searchbox").click(function () {
        var a = jQuery("#search").hasClass("show");
        if (a) {
            jQuery("#search").removeClass("show");
        }
        else {
            jQuery("#search").addClass("show");
            jQuery("#search .form-control").focus();
        }
    });
    

    
    // Stepper
    jQuery("body").on("click", ".stepper-up", function () {
        var valueInput = jQuery(this).parent(".stepper").children(".form-control");
        valueInput.val(parseInt(valueInput.val()) + 1);
    });
    jQuery("body").on("click", ".stepper-down", function () {
        var valueInput = jQuery(this).parent(".stepper").children(".form-control");
        if (parseInt(valueInput.val()) < 1) {
            
        }
        else{
            valueInput.val(parseInt(valueInput.val()) - 1);
        }
    });
    
    
    // Notification
    // trigger notification
    function notification(target, time) {
        var a = "#" + target;
        jQuery(".notification-box").removeClass("show");
        setTimeout(() => {
            jQuery(a).addClass("show");
        }, 300);
        if (time) {
            time = time + 300;
            setTimeout(() => {
                jQuery(".notification-box").removeClass("show");
            }, time);
        }
    };
    // close button notification
    jQuery(".notification-box .close-button").click(function (event) {
        event.preventDefault();
        jQuery(".notification-box.show").removeClass("show");
    });
    // tap to close notification
    jQuery(".notification-box.tap-to-close .notification-dialog").click(function () {
        jQuery(".notification-box.show").removeClass("show");
    });
    
    
    // Toast
    // trigger toast
    function toastbox(target, time) {
        var a = "#" + target;
        jQuery(".toast-box").removeClass("show");
        setTimeout(() => {
            jQuery(a).addClass("show");
        }, 100);
        if (time) {
            time = time + 100;
            setTimeout(() => {
                jQuery(".toast-box").removeClass("show");
            }, time);
        }
    };
    // close button toast
    jQuery(".toast-box .close-button").click(function (event) {
        event.preventDefault();
        jQuery(".toast-box.show").removeClass("show");
    });
    // tap to close toast
    jQuery(".toast-box.tap-to-close").click(function () {
        jQuery(this).removeClass("show");
    });

     
    
    // Offline Mode / Online Mode Detection

    // You can change the texts here
    jQuery(document).ready(function () {
    var OnlineText = "Connected to Internet";
    var OfflineText = "No Internet Connection";

    // Online Mode Toast Append
    function onlineModeToast() {
        jQuery("body").append(
            "<div id='online-toast' class='toast-box bg-success toast-top tap-to-close'>"
            +
            "<div class='in'><div class='text'>"
            +
            OnlineText
            +
            "</div></div></div>"
        );
        setTimeout(() => {
            toastbox('online-toast', 3000);
        }, 500);
    }

    // Ofline Mode Toast Append
    function offlineModeToast() {
        jQuery("body").append(
            "<div id='offline-toast' class='toast-box bg-danger toast-top tap-to-close'>"
            +
            "<div class='in'><div class='text'>"
            +
            OfflineText
            +
            "</div></div></div>"
        );
        setTimeout(() => {
            toastbox('offline-toast');
        }, 500);
    }

    // Online Mode Function
    function onlineMode() {
        if (jQuery("#offline-toast").hasClass("show")) {
            jQuery("#offline-toast").removeClass("show");
        }
        if (jQuery("#online-toast").length > 0) {
            jQuery("#online-toast").addClass("show");
            setTimeout(() => {
                jQuery("#online-toast").removeClass("show");
            }, 3000);
        }
        else {
            onlineModeToast();
        }
        jQuery(".toast-box.tap-to-close").click(function () {
            jQuery(this).removeClass("show");
        });
    }

    // Offline Mode Function
    function offlineMode() {
        if (jQuery("#online-toast").hasClass("show")) {
            jQuery("#online-toast").removeClass("show");
        }
        if (jQuery("#offline-toast").length > 0) {
            jQuery("#offline-toast").addClass("show");
        }
        else {
            offlineModeToast();
        }
        jQuery(".toast-box.tap-to-close").click(function () {
            jQuery(this).removeClass("show");
        });
    }

    // Check with event listener if online or offline
    window.addEventListener('online', onlineMode);
    window.addEventListener('offline', offlineMode);  
    });

    
    // Multi-level Listview
    jQuery(".multi-level > a.item").click(function () {
        if (jQuery(this).parent(".multi-level").hasClass("active")) {
            jQuery(this).next("ul").slideToggle(250);
            jQuery(this).parent(".multi-level").removeClass("active");
        }
        else {
            // jQuery(".multi-level ul").slideUp(250);
            jQuery(this).parent(".multi-level").parent("ul").children("li").children("ul").slideUp(250)
            jQuery(this).next("ul").slideToggle(250);
            jQuery(this).parent(".multi-level").parent("ul").children(".multi-level").removeClass("active")
            // jQuery(".multi-level").removeClass("active");
            jQuery(this).parent(".multi-level").addClass("active");
        }
    });
    
    
    // Add to Home
    function AddtoHome(time, once) {
        if (once) {
            var AddHomeStatus = localStorage.getItem("MobilekitAddHomeStatus");
            if (AddHomeStatus === "1" || AddHomeStatus === 1) {
                // already showed up
            }
            else {
                localStorage.setItem("MobilekitAddHomeStatus", 1)
                window.addEventListener('load', () => {
                    if (navigator.standalone) {
                        // if app installed ios home screen
                    }
                    else if (matchMedia('(display-mode: standalone)').matches) {
                        // if app installed android home screen
                    }
                    else {
                        // if app is not installed
                        if (androidDetection) {
                            setTimeout(() => {
                                jQuery('#android-add-to-home-screen').modal();
                            }, time);
                        }
                        if (iosDetection) {
                            setTimeout(() => {
                                jQuery('#ios-add-to-home-screen').modal();
                            }, time);
                        }
                    }
                });
            }
        }
        else {
            window.addEventListener('load', () => {
                if (navigator.standalone) {
                    // app loaded to ios
                }
                else if (matchMedia('(display-mode: standalone)').matches) {
                    // app loaded to android
                }
                else {
                    // app not loaded
                    if (androidDetection) {
                        setTimeout(() => {
                            jQuery('#android-add-to-home-screen').modal();
                        }, time);
                    }
                    if (iosDetection) {
                        setTimeout(() => {
                            jQuery('#ios-add-to-home-screen').modal();
                        }, time);
                    }
                }
            });
        }

    }
    
    
    // Dark Mode Detection
    var checkDarkModeStatus = localStorage.getItem("MobilekitDarkModeActive");
    // if dark mode on
    if (checkDarkModeStatus === 1 || checkDarkModeStatus === "1") {
        jQuery(".dark-mode-switch").attr('checked', true);
        if (jQuery("body").hasClass("dark-mode-active")) {
        }
        else {
            jQuery("body").addClass("dark-mode-active");
        }
    }
    else {
        jQuery(".dark-mode-switch").attr('checked', false);
    }
    // Dark mode switch
    jQuery('.dark-mode-switch').change(function () {
        jQuery(".dark-mode-switch").trigger('.dark-mode-switch');
        var darkmodeCheck = localStorage.getItem("MobilekitDarkModeActive");

        if (darkmodeCheck === 1 || darkmodeCheck === "1") {
            if (jQuery("body").hasClass("dark-mode-active")) {
                jQuery("body").removeClass("dark-mode-active");
            }
            localStorage.setItem("MobilekitDarkModeActive", "0");
            jQuery(".dark-mode-switch").attr('checked', false);
        }
        else {
            jQuery("body").addClass("dark-mode-active");
            jQuery(".dark-mode-switch").attr('checked', true);
            localStorage.setItem("MobilekitDarkModeActive", "1");
        }
    });
    var dmswitch = jQuery(".dark-mode-switch");
    dmswitch.on('change', function () {
        dmswitch.prop('checked', this.checked);
    });
    
  }
}
</script>
