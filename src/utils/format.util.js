export const getMessageError = (error)=>{
  if( typeof error === 'string' ) return error
  return error?.response?.data?.errors?.message 
    ?? error?.response?.data?.error?.message
    ?? error?.errors?.message 
    ?? error?.message ?? "Error";
}

export const getNameFromTag = (tag) => {
  return tag.name ?? tag
}