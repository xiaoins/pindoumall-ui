import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isCartSidebarOpen = ref(false)
  const isUserSidebarOpen = ref(false)
  const isMobileMenuOpen = ref(false)
  const isSearchOpen = ref(false)
  const showBackToTop = ref(false)
  
  const openCartSidebar = () => {
    isCartSidebarOpen.value = true
    document.body.style.overflow = 'hidden'
  }
  
  const closeCartSidebar = () => {
    isCartSidebarOpen.value = false
    document.body.style.overflow = ''
  }
  
  const openUserSidebar = () => {
    isUserSidebarOpen.value = true
    document.body.style.overflow = 'hidden'
  }
  
  const closeUserSidebar = () => {
    isUserSidebarOpen.value = false
    document.body.style.overflow = ''
  }
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }
  
  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }
  
  const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value
  }
  
  const closeSearch = () => {
    isSearchOpen.value = false
  }
  
  const closeAllSidebars = () => {
    closeCartSidebar()
    closeUserSidebar()
    closeMobileMenu()
    closeSearch()
  }
  
  const setBackToTopVisibility = (visible) => {
    showBackToTop.value = visible
  }
  
  return {
    isCartSidebarOpen,
    isUserSidebarOpen,
    isMobileMenuOpen,
    isSearchOpen,
    showBackToTop,
    openCartSidebar,
    closeCartSidebar,
    openUserSidebar,
    closeUserSidebar,
    toggleMobileMenu,
    closeMobileMenu,
    toggleSearch,
    closeSearch,
    closeAllSidebars,
    setBackToTopVisibility
  }
})