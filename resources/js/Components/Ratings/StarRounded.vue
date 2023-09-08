<template>
  <div
    class="star-rating"
    :aria-label="rating + ' of 5'"
    style="transform: rotate(55deg)"
  >
    <div
      v-for="(star, index) in stars"
      :key="index"
      class="star-container"
      :style="{
        left: star.x + 'px',
        top: star.y + 'px',
        transform: `translate(-50%, -50%) rotate(${star.rotation}deg)`,
      }"
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
      :class="`indicator font-mono font-semibold flex justify-center items-center ${indicatorClasses} text-xl `"
      :style="{
        transform: 'translateY(2px)',
      }"
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
    rating: {
      type: Number,
      default: 4.7,
    },
    starWidth: {
      type: Number,
      default: 24,
    },
    starHeight: {
      type: Number,
      default: 24,
    },
    starStyle: {
      type: Object,
    },
    isIndicatorActive: {
      type: Boolean,
      default: true,
    },
    indicatorClasses: {
      type: String,
      default: "",
    },
  },
  data: function () {
    return {
      stars: [],
      emptyStar: 0,
      fullStar: 1,
      totalStars: 5,
      styleEmptyStarColor: "#737373",
      styleFullStarColor: "#ed8a19",
    };
  },
  directives: {},
  computed: {
    styleStarWidth() {
      return this.starWidth;
    },
    styleStarHeight() {
      return this.starHeight;
    },
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
      let radius = 13; // Adjust as needed to fit within your .star-rating dimensions
      let centerX = 20; // Half of .star-rating width
      let centerY = 20; // Half of .star-rating height
      let startingRotation = 20; // This might need to be adjusted depending on the initial orientation of your star

      for (let i = 0; i < this.totalStars; i++) {
        let angle = i * 72 * (Math.PI / 180); // Convert to radians

        let xPosition = centerX + radius * Math.cos(angle);
        let yPosition = centerY + radius * Math.sin(angle);
        let rotation = i * 72 + startingRotation;

        this.stars.push({
          raw: this.emptyStar,
          percent: this.emptyStar + "%",
          x: xPosition,
          y: yPosition,
          rotation: rotation,
        });
      }
    },
    setStars() {
      let fullStarsCounter = Math.floor(this.rating);
      for (let i = 0; i < this.stars.length; i++) {
        if (fullStarsCounter !== 0) {
          this.stars[i].raw = this.fullStar;
          this.stars[i].percent = this.calcStarFullness(this.stars[i]);
          fullStarsCounter--;
        } else {
          let surplus = Math.round((this.rating % 1) * 10) / 10; // Support just one decimal
          if (surplus === 0.1) {
            surplus = surplus + 0.15;
          }
          if (surplus === 0.2) {
            surplus = surplus + 0.1;
          }
          if (surplus === 0.3) {
            surplus = surplus + 0.05;
          }
          if (surplus === 0.9) {
            surplus = surplus - 0.15;
          }
          if (surplus === 0.8) {
            surplus = surplus - 0.1;
          }
          if (surplus === 0.7) {
            surplus = surplus - 0.05;
          }
          let roundedOneDecimalPoint = Math.round(surplus * 10) / 10;
          this.stars[i].raw = roundedOneDecimalPoint;

          return (this.stars[i].percent = this.calcStarFullness(this.stars[i]));
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
};
</script>
  
  <style scoped>
.star-rating {
  position: relative;
  width: 40px; /* Adjust to fit your desired circle size */
  height: 40px; /* Adjust to fit your desired circle size */
}

.star-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.star-container:not(:last-child) {
  margin-right: 0px;
}
.text-small {
  font-size: 1rem;
}
</style>
  