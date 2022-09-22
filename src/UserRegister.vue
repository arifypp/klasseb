<template>
  <div id="appCapsule" class="pt-0">
    <div v-if="message" class="form-message is-error-message">
      {{ message }}
    </div>
    <div class="login-form my-3">
          <div class="section my-4 pt-3">
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

        <form class="form" @submit.prevent="register">
          <div class="form-group boxed">
              <div class="input-wrapper">
                  <input type="text" class="form-control" v-model.trim="name" id="Name" placeholder="Enter Name">
              </div>
          </div>

          <div class="form-group boxed">
              <div class="input-wrapper">
                  <input type="email" class="form-control" v-model.trim="email" id="Email" placeholder="Email address">
              </div>
          </div>

          <div class="form-group boxed">
              <div class="input-wrapper">
                  <input type="password" class="form-control" v-model.trim="password" id="password1" placeholder="Password">
              </div>
          </div>
          
          <div class="form-group boxed">
              <div class="input-wrapper">
                  <input type="password" class="form-control" v-model.trim="passwordRepeat" id="passwordConfirm" placeholder="Password Repeat">
              </div>
          </div>

          
          <div class="form-button">
              <button type="submit" class="btn btn-primary btn-block btn-lg">Register Now</button>
              <!-- <router-link to="/dashboard" class="btn btn-primary btn-block btn-lg">Log in</router-link> -->
              <div class="mt-3"> Already have an account?
                  <router-link :to="{name: 'UserLogin'}"><strong>Login Now</strong></router-link>
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
    name: "UserRegister",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            passwordRepeat: "",
            message: "",
            loading: false,
        };
    },
    methods: {
        async register() {
            this.message = "";
            this.loading = true;
            try {
                // Call the login function in store.js
                await this.$store.dispatch("register", {
                    name: this.name,
                    username: this.email,
                    password: this.password,
                    passwordRepeat: this.passwordRepeat,
                });
                this.loading = false;
                // if success, redirect to Login with message
                this.$router.push({
                    name: "UserLogin",
                    query: {
                        message: "Register successfull! You can now login"
                    },
                });
            }
            catch (error) {
              this.loading = false;
                this.message = this.message
                    ? error.response.data.message
                    : "No response from server";
            }
        }
    },
    components: { Loader, Loader }
}
</script>

<style lang="sass">
</style>