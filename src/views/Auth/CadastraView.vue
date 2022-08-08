<template>
  <div class="container-fluid vh-100">
    <div class="" style="margin-top: 200px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Castrar</h3>
          </div>
          <form @submit.stop.prevent="submit">
            <div class="p-4">
              <div class="d-flex flex-column justify-content-center">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary">
                    <i class="bi bi-person-plus-fill text-white"></i>
                  </span>
                  <input
                    v-model="state.name"
                    type="text"
                    class="form-control"
                    placeholder="Seu Nome"
                  />
                </div>

                <span
                  v-if="v$.name.$error"
                  class="text-danger text-center pb-2"
                >
                  {{ v$.name.$errors[0].$message }}
                </span>
              </div>

              <div class="d-flex flex-column justify-content-center">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary">
                    <i class="bi bi-envelope text-white"></i>
                  </span>
                  <input
                    type="email"
                    v-model="state.email.email"
                    class="form-control"
                    placeholder="Seu E-mail"
                  />
                </div>

                <span
                  v-if="v$.email.email.$error"
                  class="text-danger text-center pb-2"
                >
                  {{ v$.email.email.$errors[0].$message }}
                </span>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary">
                    <i class="bi bi-envelope text-white"></i>
                  </span>
                  <input
                    type="email"
                    v-model="state.email.confirm"
                    class="form-control"
                    placeholder="Confirmar E-mail"
                  />
                </div>
                <span
                  v-if="v$.email.confirm.$error"
                  class="text-danger text-center pb-2"
                >
                  {{ v$.email.confirm.$errors[0].$message }}
                </span>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary">
                    <i class="bi bi-key-fill text-white"></i>
                  </span>
                  <input
                    type="password"
                    v-model="state.password.password"
                    class="form-control"
                    placeholder="Seu Senha"
                  />
                </div>
                <span
                  v-if="v$.password.password.$error"
                  class="text-danger text-center pb-2"
                >
                  {{ v$.password.password.$errors[0].$message }}
                </span>
              </div>
              <div class="d-flex flex-column justify-content-center">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-primary">
                    <i class="bi bi-key-fill text-white"></i>
                  </span>
                  <input
                    type="password"
                    v-model="state.password.confirm"
                    class="form-control"
                    placeholder="Confirmar Senha"
                  />
                </div>
                <span
                  v-if="v$.password.confirm.$error"
                  class="text-danger text-center pb-2"
                >
                  {{ v$.password.confirm.$errors[0].$message }}
                </span>
              </div>
              <button
                class="btn btn-primary text-center mt-2"
                type="submit"
              >
                Entra
              </button>
              <p class="text-center mt-5">
                Voce já tem conta?
                <a href="#" class="text-primary">Faz seu login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  setup() {
    const state = reactive({
      name: "",
      email: {
        email: "",
        confirm: "",
      },
      password: {
        password: "",
        confirm: "",
      },
    });

    const rules = computed(() => {
      return {
        name: {
          required: helpers.withMessage("O compo não pode ser vazio", required),
          maxLength: helpers.withMessage(
            "O campo apena pode ter no máximo 255 caracteres",
            maxLength(255)
          ),
          minLength: helpers.withMessage(
            "O campo apena pode ter no mínio 3 caracteres",
            minLength(3)
          ),
        },
        email: {
          email: {
            required: helpers.withMessage(
              "O compo não pode ser vazio",
              required
            ),
            email: helpers.withMessage("O campo deve ser do tipo email", email),
          },
          confirm: {
            required: helpers.withMessage(
              "O compo não pode ser vazio",
              required
            ),
            sameAs: helpers.withMessage(
              "Os e-mail não correspondem",
              sameAs(state.email.email)
            ),
          },
        },
        password: {
          password: {
            required: helpers.withMessage(
              "O compo não pode ser vazio",
              required
            ),
            minLength: helpers.withMessage(
              "O campo apena pode ter no mínio 3 caracteres",
              minLength(3)
            ),
          },
          confirm: {
            required: helpers.withMessage(
              "O compo não pode ser vazio",
              required
            ),
            sameAs: helpers.withMessage(
              "Os senhas não correspondem",
              sameAs(state.password.password)
            ),
          },
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
        alert("Form successfully submitted.");
      } else {
        alert("Form failed to validate");
      }
    },
  },
};
</script>
