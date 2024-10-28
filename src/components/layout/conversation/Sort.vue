<template>
  <!--Sort-->
  <div class="comment-sort">
    Sort by
    <span @click.prevent="openSort"
      ><strong>{{ sortSelected }} ▼</strong></span
    >
    <div v-if="showSortMenu" class="menu-container">
      <span
        class="menu-item"
        :class="sortSelected === 'Best' ? 'menu-item-selected' : 'menu-item'"
        @click.prevent="sortResult('Best')"
        >Best</span
      >
      <span
        class="menu-item"
        :class="sortSelected === 'Newest' ? 'menu-item-selected' : 'menu-item'"
        @click.prevent="sortResult('Newest')"
        >Newest</span
      >
      <span
        class="menu-item"
        :class="sortSelected === 'Oldest' ? 'menu-item-selected' : 'menu-item'"
        @click.prevent="sortResult('Oldest')"
        >Oldest
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {},

  data() {
    return {
      showSortMenu: false,
      sortSelected: "Newest",
      error: null,
    };
  },

  methods: {
    openSort() {
      this.showSortMenu = !this.showSortMenu;
    },
    sortResult(str) {
      this.sortSelected = str;
      this.showSortMenu = false;
    },
  },
};
</script>

<style scoped>
.comment-sort {
  display: block;
  font-size: 1rem;
  padding-top: 1rem;
  cursor: pointer;
}
.menu-container {
  display: block;
  width: max-content;
  margin-left: 3rem;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}

.menu-item {
  display: block;
  width: auto;
  padding: 0.5rem 0rem;
  cursor: pointer;
}

.menu-item-selected {
  font-weight: 700;
}

.menu-item-selected:after {
  content: "\f00c";
  font: normal normal normal 14px/1 FontAwesome;
  padding-left: 1rem;
}
</style>
