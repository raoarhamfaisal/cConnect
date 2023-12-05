
import { template } from 'lodash';
<template>
   <!-- INDIVIDUAL POST: BOTTOM ROW MENU -->
          <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
          <div class="flex flex-row justify-between items-center w-full mb-2">
            <!-- Likes -->
            <div class="">
              <Link
                href="#"
                class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/like_green.png"
                      width="25"
                      height="25"
                    />
                  </div>
                  <div class="pl-1">
                    {{ postToEnlarge.likes }}
                  </div>
                </div>
              </Link>
            </div>

            <!-- Comments -->
            <div class="">
              <Link
                href="#"
                class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/comment_icon.png"
                      width="25"
                      height="25"
                    />
                  </div>
                  <div class="pl-1">12,999</div>
                </div>
              </Link>
            </div>

            <!-- Re-Posted -->
            <div class="">
              <Link
                href="#"
                class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/share_icon.png"
                      width="25"
                      height="25"
                    />
                  </div>
                  <div class="pl-1">
                    {{ postToEnlarge.repost }}
                  </div>
                </div>
              </Link>
            </div>

            <!-- Shares -->
            <div class="">
              <Link
                href="#"
                class="font-medium text-xs sm:text-sm text-blue-800 hover:underline"
              >
                <div class="flex flex-row justify-between items-center">
                  <div class="">
                    <img
                      src="/images/icons/share_out_icon.png"
                      width="20"
                      height="17"
                    />
                  </div>
                  <div class="pl-1">
                    {{ postToEnlarge.shares }}
                  </div>
                </div>
              </Link>
            </div>
          </div>
</template>