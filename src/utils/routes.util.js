const availableForLayout = (routes, layout) => routes.filter(item=>item.meta?.layout.includes(layout))

const availableRoutes = (routes) => routes.filter(item=>item.meta?.isAvailable())

export {
  availableForLayout,
  availableRoutes
}