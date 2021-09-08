filterContainer_mobile.addEventListener("click", (e) => {
    console.log(e);
    if (e.target.matches("#f-people-mobile")) {
        console.log('people:,', e.target.id)
        peoplePosts.setAttribute('class', 'margin-x-lg@md margin-x-md margin-x-xxl@md margin-x-auto@xl max-width-xl');
        nowPosts.setAttribute('class', 'is-hidden');
        venturesPosts.setAttribute('class', 'is-hidden');
        allPosts.setAttribute('class', 'is-hidden');

        //change color menu
        peopleFilter_mobile.setAttribute('class', 'dropdown-item color-white pagination__item--selected label-title text-decoration-none text-uppercase');
        nowFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
        venturesFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
        allFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
    }

    if (e.target.matches("#f-now-mobile")) {
        console.log('now:,', e.target.id)
        peoplePosts.setAttribute('class', 'is-hidden');
        nowPosts.setAttribute('class', 'margin-x-lg@md margin-x-md margin-x-xxl@md margin-x-auto@xl max-width-xl');
        venturesPosts.setAttribute('class', 'is-hidden');
        allPosts.setAttribute('class', 'is-hidden');

        //change color menu
        peopleFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
        nowFilter_mobile.setAttribute('class', 'dropdown-item color-white pagination__item--selected label-title text-decoration-none text-uppercase');
        venturesFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
        allFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
    }

    if (e.target.matches("#f-ventures-mobile")) {
        console.log('ventures:,', e.target.id)
        peoplePosts.setAttribute('class', 'is-hidden');
        nowPosts.setAttribute('class', 'is-hidden');
        venturesPosts.setAttribute('class', 'margin-x-lg@md margin-x-md margin-x-xxl@md margin-x-auto@xl max-width-xl');
        allPosts.setAttribute('class', 'is-hidden');

        //change color menu
        peopleFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
        nowFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
        venturesFilter_mobile.setAttribute('class', 'dropdown-item color-white pagination__item--selected label-title text-decoration-none text-uppercase');
        allFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
    }

    if (e.target.matches("#f-all-mobile")) {
        console.log('all:,', e.target.id)
        peoplePosts.setAttribute('class', 'is-hidden');
        nowPosts.setAttribute('class', 'is-hidden');
        venturesPosts.setAttribute('class', 'is-hidden');
        allPosts.setAttribute('class', 'margin-x-lg@md margin-x-md margin-x-xxl@md margin-x-auto@xl max-width-xl');

        //change color menu
        peopleFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
        nowFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
        venturesFilter_mobile.setAttribute('class', 'dropdown-item color-white opacity-logo label-title text-decoration-none text-uppercase');
        allFilter_mobile.setAttribute('class', 'dropdown-item color-white pagination__item--selected label-title text-decoration-none text-uppercase');
    }
});