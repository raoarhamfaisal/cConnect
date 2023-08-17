<script setup>
import PostShowTheImage from '@/Components/tCon/tConSub/PostShowTheImage.vue';
import { computed } from "vue";

const props = defineProps({
    imageArray: Array,

    numberOfImages: {
        type: Number,
        default: 0,
    },

});

const cropImage = false;    //  Tells PostShowTheImage.vue to crop image

const plusImages = true;    // tells PostShowTheImage.vue to
                            // display the "+" - prop is default is false
                            // we send this on last image of >= 5


</script>

<template>

    <div class="w-full"
        >

        <p>numberOfImages: {{ numberOfImages }}</p>

            <div v-if="numberOfImages == 1"
                 class="flex flex-col flex-nowrap
                        w-full gap-1
                        pb-1">
                    <!-- 1 Image here     ++++++++++++++++++++++++++++++++++
                    +++++++++++++++++++++++++++++++++++++++++++++++++++++-->
                    <PostShowTheImage :image="imageArray[0]"
                                      :numberImages="numberOfImages"
                                      :cropImage="true"
                                      :plusImages="false"
                    />
            </div>

            <div v-if="numberOfImages == 2"
                 class="flex flex-col flex-nowrap
                        w-full gap-1
                        pb-1">
                    <!-- 2 Images Here    +++++++++++++++++++++++++++++
                    +++++++++++++++++++++++++++++++++++++++++++++++ -->
                    <PostShowTheImage :image="imageArray[0]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                    />
                    <PostShowTheImage :image="imageArray[1]"
                                      :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                    />
            </div>


            <div v-if="numberOfImages == 3">
                <!-- 3 Images Here    ++++++++++++++++++++++++++++++++++
                +++++++++++++++++++++++++++++++++++++++++++++++++++++-->
                    <div class="flex flex-col flex-nowrap
                            w-full gap-1
                            pb-1">
                        <PostShowTheImage :image="imageArray[0]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                    </div>
                    <div class="grid grid-rows-1 grid-cols-2
                                w-full h-full
                                gap-1
                                pb-1
                                ">

                        <PostShowTheImage :image="imageArray[1]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        <PostShowTheImage :image="imageArray[2]"
                                            :numberImages="numberOfImages"
                                            :cropImage="true"
                                            :plusImages="false"
                        />
                    </div>
            </div>



            <div v-if="numberOfImages == 4">
                <!-- 4 Images Here    ++++++++++++++++++++++++++++++++++
                +++++++++++++++++++++++++++++++++++++++++++++++++++++-->

                <div class="flex flex-col flex-nowrap
                            w-full gap-1
                            pb-1">
                    <div>
                        <PostShowTheImage :image="imageArray[0]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        </div>
                    <div>
                        <PostShowTheImage :image="imageArray[1]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        </div>
                </div>
                <div class="grid grid-rows-1 grid-cols-2
                                w-full h-full
                                gap-1
                                pb-1">
                    <div>
                        <PostShowTheImage :image="imageArray[2]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        </div>
                    <div>
                        <PostShowTheImage :image="imageArray[3]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        </div>
                </div>
            </div>


            <div v-if="numberOfImages == 5">
                <!-- 5 Images Here    ++++++++++++++++++++++++++++++++++
                +++++++++++++++++++++++++++++++++++++++++++++++++++++-->
                <div class="flex flex-col flex-nowrap
                            w-full gap-1
                            pb-1">
                    <div>
                        <PostShowTheImage :image="imageArray[0]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        </div>
                    <div>
                        <PostShowTheImage :image="imageArray[1]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        </div>
                </div>
                <div class="grid grid-rows-1 grid-cols-3
                                w-full h-full
                                gap-1
                                pb-1">
                    <div>
                        <PostShowTheImage :image="imageArray[2]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        </div>
                    <div>
                        <PostShowTheImage :image="imageArray[3]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        </div>
                    <div>
                        <PostShowTheImage :image="imageArray[4]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                        </div>
                </div>
            </div>



            <div v-if="numberOfImages >= 6">
                <!-- 6 Images Here    ++++++++++++++++++++++++++++++++++
                +++++++++++++++++++++++++++++++++++++++++++++++++++++-->
                <div class="flex flex-col flex-nowrap
                            w-full gap-1
                            pb-1">
                    <div>
                        <PostShowTheImage :image="imageArray[0]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                            />
                        </div>
                    <div>
                        <PostShowTheImage :image="imageArray[1]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                             />
                        </div>
                </div>
                <div class="grid grid-rows-1 grid-cols-3
                                w-full h-full
                                gap-1
                                pb-1">
                    <div>
                        <PostShowTheImage :image="imageArray[2]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                    </div>
                    <div>
                        <PostShowTheImage :image="imageArray[3]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="false"
                        />
                    </div>
                    <div>
                        <PostShowTheImage :image="imageArray[4]"
                                          :numberImages="numberOfImages"
                                          :cropImage="true"
                                          :plusImages="true"
                        />
                    </div>
                </div>
            </div>




    </div>

</template>


