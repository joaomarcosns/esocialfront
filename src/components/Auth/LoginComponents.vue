<template>
  <div class="container-fluid vh-100">
            <div class="" style="margin-top:200px">
                <div class="rounded d-flex justify-content-center">
                    <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
                        <div class="text-center">
                            <h3 class="text-primary">Login</h3>
                        </div>
                        <form action="">
                            <div class="p-4">
                                <div class="input-group mb-3">
                                    <span class="input-group-text bg-primary">
                                        <i class="bi bi-person-plus-fill text-white"></i>
                                    </span>
                                    <input type="email" v-model="email" class="form-control" placeholder="E-mail">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text bg-primary">
                                        <i class="bi bi-key-fill text-white"></i>
                                    </span>
                                    <input type="password" v-model="password" class="form-control" placeholder="Senha">
                                </div>
                                <button class="btn btn-primary text-center mt-2" @click="submit">
                                    Entra
                                </button>
                                <p class="text-center mt-5">Voce não tem conta?
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
export default {
  name: 'LoginComponents',
}
</script>

<style>
</style>