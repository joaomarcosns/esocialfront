<template>
  <div class="container-fluid vh-100">
    <div class="" style="margin-top: 200px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Login</h3>
          </div>
          <form @submit.stop.prevent="submit">
            <div class="p-4">
              <div class="d-flex flex-column justify-content-center">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary">
                    <i class="bi bi-person-plus-fill text-white"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="state.email"
                    placeholder="E-mail"
                  />
                </div>
                <span
                  v-if="v$.email.$error"
                  class="text-danger text-center pb-2"
                >
                  {{ v$.email.$errors[0].$message }}
                </span>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary">
                    <i class="bi bi-key-fill text-white"></i>
                  </span>
                  <input
                    type="password"
                    class="form-control"
                    v-model="state.password"
                    placeholder="Senha"
                    autocomplete="on"
                  />
                </div>
                <span
                  v-if="v$.password.$error"
                  class="text-danger text-center pb-2"
                >
                  {{ v$.password.$errors[0].$message }}
                </span>
              </div>
              <button class="btn btn-primary text-center mt-2">Entra</button>
              <p class="text-center mt-5">
                Voce não tem conta?
                <a href="#" class="text-primary">Criar senha</a>
              </p>
              <a href="#" class="text-center text-primary">Esqueceu a senha?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import api from "@/services/api";
export default {
  setup() {
    const state = reactive({
      email: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        email: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
          email: helpers.withMessage("O campo deve ser do tipo email", email),
        },
        password: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
        },
      };
    });
    const v$ = useVuelidate(rules, state);

    return { state, v$ };
  },
  methods: {
    submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        var data = { email: this.state.email, password: this.state.password };
        this.login(data);
      } else {
        alert("Form failed to validate");
      }
    },
    login(data) {
      api
        .post("/auth/login", data)
        .then((response) => {
          if (Cookies.get("_myapp_token")) {
            Cookies.remove("_myapp_token");
          }
          Cookie.set("_myapp_token", response.data.access_token);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
