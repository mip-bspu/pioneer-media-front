const availableForLayout = (routes, layout) => routes.filter(item=>item.meta?.layout.includes(layout))

const availableRoutes = (routes) => routes.filter(item=>item.meta?.isAuth())

export {
  availableForLayout,
  availableRoutes
}