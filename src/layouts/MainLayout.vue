<template>
  <div>
    <div class="app-main-layout">
      <Navbar/>

      <Sidebar/>

      <main class="app-content">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

<!--      Footer-->
      <div>
        <v-footer
            dark
            padless
        >
          <v-card
              class="flex text-center"
              flat
              tile
          >
            <v-card-text class="py-2 white--text text-center">
              <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4"
                  dark
                  icon
              >
                <v-icon size="24px">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-footer>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/layoutApp/Navbar'
import Sidebar from '@/components/layoutApp/Sidebar'

export default {
  name: 'main-layout',
  data: () => ({
    icons: [
      'mdi-instagram'
    ],
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!this.$store.getters.info.bill || !this.$store.getters.info.name) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
}
</script>
