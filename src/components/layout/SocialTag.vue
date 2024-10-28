<template>
    <div class="social-tag">
        <span class="share" v-if="showShare">Share Now!</span>
        <a v-if="showTwitter" :href="`http://twitter.com/share?text=${title}&amp;url=${host}&amp;hashtags=firestarters`" 
            target="_blank" class="social-link"> 
            <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" width="32" height="32">
            <path class="bg" d="M0 0v18.293l6.415 6.414L0 31.122V48h48V0z" fill="#55acee"></path>
            <path d="M19.92 33.453c8.447 0 13.067-6.997 13.067-13.065 0-.199 0-.397-.013-.594a9.344 9.343 0 002.29-2.376 9.167 9.165 0 01-2.637.722 4.608 4.608 0 002.02-2.54 9.203 9.202 0 01-2.917 1.115 4.597 4.596 0 00-7.826 4.188 13.038 13.036 0 01-9.465-4.798 4.596 4.595 0 001.422 6.13 4.558 4.558 0 01-2.085-.575v.058a4.594 4.593 0 003.685 4.502 4.585 4.585 0 01-2.074.078 4.598 4.597 0 004.29 3.19 9.215 9.214 0 01-5.703 1.969 9.348 9.347 0 01-1.093-.067 13.001 13 0 007.04 2.06" fill="#fff">
            </path>
            </svg>
        </a>
        <a v-if="showFacebook" :href="`http://www.facebook.com/sharer.php?u=${host}`" 
            target="_blank" class="social-link">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" width="32" height="32">
            <path class="bg" d="M0 0v18.293l6.415 6.414L0 31.122V48h48V0z" fill="#3b5998"></path>
            <path d="M29.658 24.669l.66-4.296h-4.143V17.58c0-1.181.598-2.332 2.44-2.332h1.872v-3.651s-1.688-.307-3.315-.307c-3.406 0-5.616 2.07-5.616 5.8v3.283H17.75v4.296h3.806v10.418c.752.123 1.534.184 2.317.184.783 0 1.565-.061 2.317-.184V24.669z" fill="#fff">
            </path>
            </svg> 
        </a>
        <a v-if="showLinkedIn" :href="`http://www.linkedin.com/shareArticle?mini=true&amp;url=${host}&amp;title=${title}&amp;summary=${caption}&amp;source=Firestarters`" 
            target="_blank" class="social-link"> 
            <svg aria-hidden="true" focusable="false" viewBox="0 0 48 48" width="32" height="32">
            <path d="M0 0v18.293l6.415 6.414L0 31.122V48h48V0z" fill="#0095ff"></path>
            <path d="M20.501 34.702h4.724v-7.935c0-.425.03-.85.155-1.153.342-.848 1.119-1.727 2.424-1.727 1.709 0 2.393 1.303 2.393 3.213v7.602h4.723v-8.148c0-4.364-2.33-6.395-5.438-6.395-2.549 0-3.667 1.424-4.289 2.394h.032v-2.06H20.5c.062 1.333 0 14.21 0 14.21zm-2.614 0v-14.21h-4.723v14.21zm-2.362-16.15c1.648 0 2.673-1.091 2.673-2.455-.03-1.394-1.025-2.455-2.641-2.455s-2.672 1.06-2.672 2.455c0 1.364 1.025 2.455 2.61 2.455h.03z" fill="#fff">
            </path>
            </svg>
        </a>
    </div>
</template>

<script>

    export default({
        props: {
            title: { type: String , default: '' },
            caption: { type: String , default: '' },
            showShare: { type: Boolean },
            showTwitter: { type: Boolean },
            showFacebook: { type: Boolean },
            showLinkedIn: { type: Boolean }
        },

        data() {
            return {
                host: window.location
            }
        },
    })

</script>

<style scoped>

    .social-tag {
        display:block;
        float:left;
        padding:1rem 0rem;
    }

    .social-link {
        margin-left:1rem;
    }

    .share {
        display:block;
        float:right;
        padding-left: 1rem;
        padding-top: .25rem;
    }

    /* Small devices (landscape phones, 576px and up) */
    @media (min-width: 576px) {

    }

    /* Medium devices (tablets, 768px and up) */
    @media (min-width: 768px) {
        .social-tag {
        display:block;
        float:right;
    }
    }

    /* Large devices (desktops, 992px and up) */
    @media (min-width: 992px) {

    }

    /* Extra large devices (large desktops, 1200px and up) */
    @media (min-width: 1200px) {

        
    }

</style>
