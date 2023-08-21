<template>
  <div class="star-rating" :aria-label="rating + ' of 5'">
    <div
      v-for="(star, index) in stars"
      @click="handleStarClick($event, index)"
      :key="index"
      class="star-container"
    >
      <svg
        class="star-svg"
        :style="[
          { fill: `url(#gradient${star.raw})` },
          { width: styleStarWidth },
          { height: styleStarHeight },
        ]"
        aria-hidden="true"
      >
        <polygon :points="getStarPoints" style="fill-rule: nonzero" />
        <defs>
          <!--
                          id has to be unique to each star fullness(dynamic offset) - it indicates fullness above
                        -->
          <linearGradient :id="`gradient${star.raw}`">
            <stop
              id="stop1"
              :offset="star.percent"
              stop-opacity="1"
              :stop-color="getFullFillColor(star)"
            ></stop>
            <stop
              id="stop2"
              :offset="star.percent"
              stop-opacity="0"
              :stop-color="getFullFillColor(star)"
            ></stop>
            <stop
              id="stop3"
              :offset="star.percent"
              stop-opacity="1"
              :stop-color="styleEmptyStarColor"
            ></stop>
            <stop
              id="stop4"
              offset="100%"
              stop-opacity="1"
              :stop-color="styleEmptyStarColor"
            ></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div
      v-if="isIndicatorActive"
      class="indicator font-mono font-semibold flex justify-center items-center text-3xl"
      :style="{ transform: 'translateY(3px)' }"
    >
      {{ rating }}
    </div>
  </div>
</template>

<script>
export default {
  name: "stars-rating",
  components: {},
  props: {
    starStyle: {
      type: Object,
    },
    isIndicatorActive: {
      type: Boolean,
      default: true,
    },
    ratingGlobal: {
      type: Number,
      default: 4.3,
    },
  },
  data: function () {
    return {
      stars: [],
      emptyStar: 0,
      fullStar: 1,
      totalStars: 5,
      // Binded Nested Props registered as data/computed and not props
      styleStarWidth: 35,
      styleStarHeight: 35,
      styleEmptyStarColor: "#737373",
      rating: this.ratingGlobal,
      styleFullStarColor: "#ed8a19",
    };
  },
  directives: {},
  computed: {
    getStarPoints() {
      let centerX = this.styleStarWidth / 2;
      let centerY = this.styleStarWidth / 2;

      let innerCircleArms = 5; // a 5 arms star

      let innerRadius = this.styleStarWidth / innerCircleArms;
      let innerOuterRadiusRatio = 2.5; // Unique value - determines fatness/sharpness of star
      let outerRadius = innerRadius * innerOuterRadiusRatio;

      return this.calcStarPoints(
        centerX,
        centerY,
        innerCircleArms,
        innerRadius,
        outerRadius
      );
    },
  },
  methods: {
    handleStarClick(event, starIndex) {
      const starWidth = event.currentTarget.offsetWidth;
      let exactStarValue = starIndex + event.offsetX / starWidth;
      exactStarValue = Math.round(exactStarValue * 10) / 10;

      this.rating = exactStarValue; // Now, this sets the local state

      // Emit the changed value
      this.$emit("update:rating", this.rating);

      this.setStars();
    },
    calcStarPoints(
      centerX,
      centerY,
      innerCircleArms,
      innerRadius,
      outerRadius
    ) {
      let angle = Math.PI / innerCircleArms;
      let angleOffsetToCenterStar = 60;

      let totalArms = innerCircleArms * 2;
      let points = "";
      for (let i = 0; i < totalArms; i++) {
        let isEvenIndex = i % 2 == 0;
        let r = isEvenIndex ? outerRadius : innerRadius;
        let currX = centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r;
        let currY = centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r;
        points += currX + "," + currY + " ";
      }
      return points;
    },
    initStars() {
      for (let i = 0; i < this.totalStars; i++) {
        this.stars.push({
          raw: this.emptyStar,
          percent: this.emptyStar + "%",
        });
      }
    },
    setStars() {
      let fullStarsCounter = Math.floor(this.rating);
      let surplus = Math.round((this.rating % 1) * 10) / 10; // Support just one decimal

      for (let i = 0; i < this.stars.length; i++) {
        if (fullStarsCounter !== 0) {
          this.stars[i].raw = this.fullStar;
          this.stars[i].percent = this.calcStarFullness(this.stars[i]);
          fullStarsCounter--;
        } else if (surplus > 0) {
          this.stars[i].raw = surplus;
          this.stars[i].percent = this.calcStarFullness(this.stars[i]);
          surplus = 0;
        } else {
          // This will reset stars to the right of the clicked one
          this.stars[i].raw = this.emptyStar;
          this.stars[i].percent = this.emptyStar + "%";
        }
      }
    },
    getFullFillColor(starData) {
      return starData.raw !== this.emptyStar
        ? this.styleFullStarColor
        : this.styleEmptyStarColor;
    },
    calcStarFullness(starData) {
      let starFullnessPercent = starData.raw * 100 + "%";
      return starFullnessPercent;
    },
    setNestedConfigStyles(objToFlatten) {
      if (typeof objToFlatten === "object") {
        for (let i in objToFlatten) {
          let newKey =
            "style" + i.charAt(0).toUpperCase() + i.substring(1, i.length);
          this[newKey] = objToFlatten[i];
        }
      }
    },
  },
  created() {
    this.setNestedConfigStyles(this.starStyle);
    this.initStars();
    this.setStars();
  },
  //   watch: {
  //     rating: function (newRating) {
  //       this.setStars();
  //     },
  //   },
  //   mounted() {
  //     this.$el.addEventListener("click", this.handleStarClick);
  //   },
  //   beforeDestroy() {
  //     this.$el.removeEventListener("click", this.handleStarClick);
  //   },
};
</script>

<style scoped>
.star-rating {
  display: flex;
  align-items: center;
}
.star-container {
  display: flex;
}
.star-container:not(:last-child) {
  margin-right: 5px;
}
</style>
