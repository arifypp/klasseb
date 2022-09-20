<template>
    <div id="appCapsule" class="pt-0">
      <div class="login-form my-3">
          <div class="section my-4">
              <img src="./assets/img/logo.png" alt="image" class="form-image">
          </div>
          <div class="section my-3">
              <img src="./assets/img/car-bg.png" alt="">
          </div>
          <div class="section mt-1 pl-5 pr-5">
            <div v-if="loading">
                <Loader />
            </div>
              <!-- Error message -->
              <div v-if="message" class="form-message is-error-message alert alert-danger">
                {{ message }}
              </div>
              <!-- When redirected from secured page -->
              <div v-else-if="$route.query.message" class="form-message alert alert-danger">
                {{ $route.query.message }}
              </div>
              <form class="form" @submit.prevent="login">
                  <div class="form-group boxed">
                      <div class="input-wrapper">
                          <input type="email" class="form-control" v-model.trim="username" id="email1" placeholder="Email address">
                      </div>
                  </div>

                  <div class="form-group boxed">
                      <div class="input-wrapper">
                          <input type="password" class="form-control" v-model.trim="password" id="password1" placeholder="Password">
                      </div>
                  </div>

                  <div class="form-links d-block text-bold mb-2 text-right align-right">
                      <div><a href="page-forgot-password.html" class="text-muted">Forgot Password?</a></div>
                  </div>

                  <div class="form-button">
                      <button type="submit" class="btn btn-primary btn-block btn-lg">Log in</button>
                      <!-- <router-link to="/dashboard" class="btn btn-primary btn-block btn-lg">Log in</router-link> -->
                      <div class="mt-3">Do not have account?
                          <router-link :to="{name: 'UserRegister'}"><strong>Register Now</strong></router-link>
                      </div>
                  </div>

              </form>
          </div>
      </div>
    </div>
</template>

<script>
import Loader from './components/Loader.vue';

export default {
    name: "UserLogin",
    data() {
        return {
            username: "",
            password: "",
            message: "",
            loading: false,
        };
    },
    methods: {
        async login() {
           this.loading = true;
            this.message = "";
            try {
                // Call the login function in store.js
                await this.$store.dispatch("login", {
                    username: this.username,
                    password: this.password,
                });
                // if redirected to login from secured page, redirect back
                if (this.$route.query.redirectTo) {
                    // this.$router.push({ name: this.$route.query.redirectTo });
                    this.$router.push({ name: "Home" });
                    window.location.reload();
                }
                // else redirect to Home
                else {
                    this.$router.push({ name: "Home" });
                    window.location.reload();
                }
            }
            catch (error) {
                this.loading = false;
                this.message = "Email or password is wrong";
            }
        }
    },
    mounted: function () {
        jQuery(document).ready(function () {
            jQuery(".modal-backdrop").remove();
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn) {
                router.push({ name: "Home" });
            }
        });
    },
    components: { Loader }
}
</script>