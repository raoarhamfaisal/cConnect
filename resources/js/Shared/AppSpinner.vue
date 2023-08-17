<script>

export default {

    props: {
        showSpinText: Boolean
    },


    template: `
        <div class="flex justify-around mt-4 mt-2 max-w-2xl">
            <div class="loader"></div>
            <div v-if="showSpinText">
                <slot />
            </div>
        </div>
    `,

}

</script>

<style>
.loader {
    border: 3px solid #f3f3f3;
    /* Light grey */
    border-top: 3px solid #024673;
    /* Blue */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

