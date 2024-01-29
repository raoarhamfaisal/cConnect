<template>
  <div v-click-outside.prevent="deactivate">
    <div class="selecteditems" @click.prevent="toggle()">
      <ul class="chips">
        <li class="chips__itemInput">
          <div class="chips__selectedItems">
            <span
              v-for="item in selectedItems"
              :key="item.id"
              class="chips__item"
            >
              <template v-if="sortingProperty">
                <span>{{ item[sortingProperty] }}</span>
              </template>
              <template v-else>
                {{ item }}
              </template>
              <span class="chips--remove" @click.stop="onRemoveItem(item)">
                <b>x</b>
              </span>
            </span>
          </div>
          <input
            v-model="searchedText"
            @focus.prevent="activate()"
            v-if="showSearch"
            @keyup.esc="deactivate()"
            class="chips__input--fake"
            type="text"
            :placeholder="translations && translations.type_to_search"
            ref="search"
          />
        </li>
      </ul>
    </div>

    <div v-if="showList" class="allitems">
      <ul>
        <li
          class="allitems__list"
          v-for="item in filteredAllItems"
          :key="item.id"
          @click.stop="onSelectItem(item)"
          :class="{ 'allitems__list--selected': isSelected(item) }"
        >
          <template v-if="sortingProperty">
            <span>{{ item[sortingProperty] }}</span>
          </template>
          <template v-else>
            {{ item }}
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  showSearch: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array,
    required: true,
  },
  sortingProperty: {
    type: String,
    default: null,
  },
});

const sortBy = (key) => {
  return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
};

const selectedItems = ref(props.modelValue || []);
const searchedText = ref("");
const showList = ref(false);
const emit = defineEmits(["input"]);
let localValue = props.modelValue;
const store = useStore();

//Computed

const translations = computed(() => store.getters.translations);

const clickOutsideDirective = (el, binding) => {
  const handleClickOutside = (event) => {
    if (!(el === event.target || el.contains(event.target))) {
      binding.value(event);
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
};

watch(
  () => props.modelValue,
  (newVal) => {
    console.log(props.modelValue, props.modelValue.value, "hello world");
    localValue = newVal;
    selectedItems.value = props.modelValue;
  }
);

const allItems = computed(() => {
  let items = [...props.items];
  if (!props.sortingProperty) return items.sort();
  return items.sort(sortBy(props.sortingProperty));
});

const filteredAllItems = computed(() => {
  if (searchedText.value) {
    let filteredItems = allItems.value.filter((i) => {
      if (props.sortingProperty) {
        return i[props.sortingProperty]
          .toLowerCase()
          .includes(searchedText.value.toLowerCase());
      } else {
        return i.toLowerCase().includes(searchedText.value.toLowerCase());
      }
    });
    return filteredItems;
  } else {
    return allItems.value;
  }
});

const isSelected = (item) => {
  return selectedItems.value.some(
    (selectedItem) => selectedItem.id === item.id
  );
};

const onSelectItem = (item) => {
  const itemExists = selectedItems.value.some(
    (selectedItem) => selectedItem.id === item.id
  );

  if (!itemExists) {
    selectedItems.value = [...selectedItems.value, item];
  } else {
    onRemoveItem(item);
  }

  emit("input", selectedItems.value);
  searchedText.value = "";
};

const onRemoveItem = (item) => {
  selectedItems.value = selectedItems.value.filter(
    (selectedItem) => selectedItem.id !== item.id
  );
  emit("input", selectedItems.value);
};

const activate = () => {
  showList.value = true;
};
const toggle = () => {
  showList.value = !showList.value;
};

const deactivate = () => {
  console.log("deactivate");
  showList.value = false;
};
</script>

<style scoped>
.chips__selectedItems {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
}

.chips__item {
  background-color: rgba(50, 115, 220, 0.2);
  margin: 4px;
  padding: 6px;
  border-radius: 6px;
  transition: 0.3s;
  display: inline-flex;
  align-items: center;
}

.chips__itemInput {
  display: flex;
  align-items: center;
}

.chips__input--fake {
  border: none;
  padding-left: 10px;
  flex-grow: 1;
  height: 36px;
  font-size: 1rem;
  line-height: 1.42857143;
}

.chips--remove {
  margin-left: 5px;
  cursor: pointer;
}
.chips {
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  color: #363636;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  cursor: pointer;
}

.chips--remove {
  margin-right: 1px;
  margin-left: 3px;
  color: #cc0029;
}

.chips__item {
  background-color: rgba(50, 115, 220, 0.2);
  display: inline-block;
  margin: 4px;
  padding: 6px;
  border-radius: 6px;
  transition: 0.3s;
}

.chips__item:hover {
  background-color: rgba(50, 115, 220, 0.3);
}

.chips__itemInput {
  display: inline-block;
}

.chips__input--fake {
  border: none;
  width: 100%;
  line-height: 1.42857143;
  font-size: 1rem;
  height: 36px;
}

.chips__input--fake:focus,
.chips__input--fake:active {
  outline: none;
}

.allitems {
  cursor: pointer;
  border: 1px solid #dbdbdb;
  max-height: 150px;
  height: calc(100vh - 240px);
  overflow-y: scroll;
}

.allitems ul {
  list-style: none;
}

.allitems__list {
  padding: 6px;
  transition: 0.3s;
}
.allitems__list--selected {
  background-color: #241e6d;
  color: #ffffff;
}

.allitems__list:hover {
  background: #241e6d;
  color: #ffffff;
}
</style>
