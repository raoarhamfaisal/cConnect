<template>
  <!-- CALL TO ACTION SECTION -->
  <section id="cta" class="relative bg-[#073e53]">
    <!-- CTA CONTAINER -->
    <div class="">
      <div
        class="container flex flex-col-reverse md:flex-row items-center justify-around mx-auto my-0 p-6 space-y-10"
      >
        <!-- left side or bottom -->
        <div class="flex flex-col space-y-2 pt-6 md:pt-0 px-4 md:px-0">
          <div class="">
            <Link
              href="/"
              class="text-5xl md:text-6xl font-bold tracking-wide text-center"
            >
              <tContractorWhite />
            </Link>
          </div>
          <div>
            <ul
              class="capitalize text-xl font-semibold tracking-tighter text-[#b5c5cb] list-disc"
            >
              <!-- a6b9b9 -->
              <li>Locate subs to hire</li>
              <li>Find local work & job bids</li>
              <li>Be aware of whats up in your area!</li>
              <li>Check for slippery customers!</li>
              <li>Questions & Answers!</li>
              <li>Low cost targeted advertising!</li>
              <li>Mentoring: go the next level with Mentoring!</li>
              <li class="lg:max-w-md">
                <span class="font-bold italic">"No-Brainer Pricing"</span>
                &nbsp;- As contractors ourselves, seems like everyone is trying
                to sell us something at super - exorbitant prices!
                <span class="font-extrabold text-white normal-case"
                  >&nbsp;Not Here at&nbsp; <tContractorWhite /></span
                >&nbsp;... useful tools, decently priced!
              </li>
            </ul>
          </div>
        </div>

        <!-- right side or top -->
        <div class="flex flex-col justify-center">
          <div class="text-3xl text-black font-bold">
            <p class="tracking-tight text-[#b5c5cb]">Your Top Tool For Only</p>
          </div>
          <div class="flex flex-row justify-center">
            <div
              class="flex text-5xl justify-start font-extrabold text-green-rgba"
            >
              <span class="pt-10">$</span>
            </div>
            <div class="price text-white">
              <span>29</span>
            </div>
            <div
              class="flex text-xl justify-end items-end italic text-blue-rgba pb-10"
            >
              <span class="text-[#b5c5cb]">/month</span>
            </div>
          </div>
          <!-- Button Flex Item -->
          <div class="flex justify-center items-end">
            <Link
              :href="
                showit && profile && (profile.is_payment_verified === 0 || profile.active_user === 0)
                  ? '/profile-setup'
                  : route('signup')
              "
              class="p-3 px-6 pt-2 text-red bg-white rounded-lg border-white border-spacing-3 shadow-2xl shadow-black align-baseline hover:text-white hover:bg-blue-30-rgba"
              >Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
