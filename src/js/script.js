document.addEventListener('DOMContentLoaded', () => {
  // 	menu start
  const searchTriggers = document.querySelectorAll('.search-trigger')
  const searchBlock = document.querySelector('.search')
  const searchField = document.querySelector('.search__field')

  for (let trigger of searchTriggers) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault()

      if (e.target.classList.contains('search-trigger')) {
        searchBlock.classList.toggle('show')

        if (searchBlock.classList.contains('show')) {
          searchField.focus()
          searchField.classList.add('focus')
        } else {
          searchField.blur()
          searchField.classList.remove('focus')
        }
      }

      if (window.matchMedia('(max-width: 992px)').matches) {
        const searchTriggerMobile = document.querySelector(
          '.search__trigger.mobile'
        )
        searchBlock.classList.toggle('active')
      }

      // if (window.matchMedia('(min-width: 992px)').matches) {
      // 	const withinBoundaries = e.composedPath().includes(searchBlock)

      // 	if (!withinBoundaries) {
      // 		searchBlock.classList.remove('show')
      // 	}
      // }
    })
  }
  // 	menu end

  // 	burger start
  if (window.matchMedia('(max-width: 992px)').matches) {
    const burgerTrigger = document.querySelector('.burger-trigger')
    const menu = document.querySelector('.menu')

    burgerTrigger.addEventListener('click', () => {
      menu.classList.toggle('active')
    })
  }
  // 	burger end

  // products sliders start
  let productsSlider = new Swiper(".products-slider", {
    spaceBetween: 8,
    slidesPerView: 2.105,
    slidesPerGroup: 2,
    breakpoints: {
      768: {
        spaceBetween: 15,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      992: {
        spaceBetween: 26,
        slidesPerView: 4,
        slidesPerGroup: 4,
      }
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          '/' +
          '<span class="' + totalClass + '"></span>';
      },
    },
    navigation: {
      nextEl: ".products-slider .circle-btn.next",
      prevEl: ".products-slider .circle-btn.prev",
    },
  });

  let productGallery = new Swiper(".product-gallery", {
    spaceBetween: 20,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    navigation: {
      nextEl: ".product-gallery .circle-btn.next",
      prevEl: ".product-gallery .circle-btn.prev",
    },
  });
  // products sliders end

  const searchResult = document.querySelector('.search-result')
  const searchResultHeight = `calc(100vh - ${searchResult.getBoundingClientRect().top + document.body.scrollTop}px)`
  searchResult.style.maxHeight = searchResultHeight

  // accordeon start

  const allAccordeons = document.querySelectorAll('button.acco-trigger')

  if(allAccordeons) {
    allAccordeons.forEach((accordeon) => {
      const allFiltersBlocks = document.querySelectorAll('.filter-block__content')

      const parent = accordeon.closest('.acco-item')
      const content = parent.querySelector('.acco-content')
      const hiddenBlock = content.firstElementChild
      const reqHeight = hiddenBlock.clientHeight

      allFiltersBlocks.forEach((item) => {
        content.style.height = reqHeight + 'px'
      })

      accordeon.addEventListener('click', function (e) {
        e.preventDefault()

        if (!parent.classList.contains('active')) {
          parent.classList.add('active')
          content.style.height = reqHeight + 'px'
        } else {
          parent.classList.remove('active')
          content.style.height = 0
        }
      })
    })
  }

  // accordeon end

  // filters sidebar mobile start
  const sidebarShowMobile = () => {
    if (window.matchMedia('(max-width: 992px)').matches) {
      const filterTrigger = document.querySelector('.filters-trigger')
      const sidebarFilters = document.querySelector('.sidebar-filters')

      if(filterTrigger) {

        filterTrigger.addEventListener('click', () => {
          if (!sidebarFilters.classList.contains('active')) {
            sidebarFilters.classList.add('active')
            sidebarFilters.style.height = 'initial'
          } else {
            sidebarFilters.classList.remove('active')
            sidebarFilters.style.height = '0'
          }
        })
      }

    }
  }

  sidebarShowMobile()
  // filters sidebar mobile end

  const widgetConnectTrigger = document.querySelector('.widget-connect__trigger')
  const widgetConnect = document.querySelector('.widget-connect')

  widgetConnect.addEventListener('click',  () => {
    widgetConnect.classList.toggle('active')
  })

  const slider = document.getElementById('range');

  if(slider) {
    noUiSlider.create(slider, {
      start: 0,
      range: {
        min: 0,
        max: 100
      },
      connect: [true, false],
    });
  }

  customSelect('select');

})
