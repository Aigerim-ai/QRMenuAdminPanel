const BASE_URL = 'https://thearcanaqr.tech/api/'

interface TypePostRequestParams {
  url: string
  body: any
}
interface IRestaurantid {
  id: number
}
interface IP {
  title: string
  image: string
  restaurant: IRestaurantid
  price: string
  description: string
  category: string
}
interface IRestaurant {
  name: string
  address: string
  phone_number: string
  description: string
}
interface IR {
  url: string
  body: any
}
interface TypePostRequestFormParams {
  url: string
  body: IP
}
interface TypePostRequestRestaurantFormParams {
  url: string
  body: IRestaurant
}
interface TypePutFormParams {
  url: string
  id: string
  body: IP
}
interface TypeGetRequestParams {
  url: string
}

 interface TypeOrderExport{
  url: string
  body: OrderExport
 }
 interface IUser {
  first_name: string
  last_name: string
 }
 interface OrderExport {
   id: string
   created_at: string
   user: IUser
   total_price: string
   order_status: string
   return_order_status: string
   table_title: string
 }
interface TypeGetSearchRequestParams {
  url: string
  keyword: string
}
interface TypeDeleteRequestParams {
  url: string
  id: any
}
interface TypeDeleteLogoRequest{
  url: string
}
interface TypePutRequestParams {
  url: string
  id: any
  body: any
}
interface TypePutProfileParams {
  url: string
  body: any
}
interface TypeGetMainInformation {
  url: string
}
interface TypePostCategory {
  url: string
  body: any
}
export async function putProfileRequest(params: TypePutProfileParams) {
  const { url, body } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  let formData = new FormData()

  formData.append('first_name', body?.first_name)
  formData.append('position', body.position)
  formData.append('IIN', body.IIN)
  if (body.image) {
    formData.append('image', body.image)
  }

  formData.append('phone_number', body.phone_number)



  const response = await fetch(BASE_URL + url, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  })
  return await response.json()
}

export async function putRequisitesRequest(params: TypePutProfileParams) {
  const { url, body } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  let formData = new FormData()

  formData.append('organization_name', body.organization_name)
  formData.append('BIN', body.BIN)
  formData.append('bank_name', body.bank_name)
  formData.append('BIK', body.BIK)
  formData.append('IBAN', body.IBAN)
  formData.append('kbe', body.kbe)
  formData.append('currency', body.currency)

  const json = await fetch(BASE_URL + url, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  })
  return await json
}

export async function postMainInformationRequest(params: TypePostRequestParams) {
  const { url, body } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }

  const { token } = JSON.parse(tokenObject)
  let formData = new FormData()

  formData.append('name', body.name)
  formData.append('address', body.address)
  body?.category.forEach((elem: any) => {
    formData.append('category', elem)
  });
  body?.weeks.forEach((elem: any) => {
    formData.append('weeks', elem)
  });
  formData.append('description', body.description)
  formData.append('service_percent', body.service_percent)
  if(body.image) {

    formData.append('image', body.image)
  }
  formData.append('phone_number', body.phone_number)
  formData.append('price', body.price)
  formData.append('rating', body.rating)
  formData.append('state', body.state)
  formData.append('time_from', body.time_from)
  formData.append('time_before', body.time_before)
  console.log("maincccccsended data",body.images)

  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  })
  return await json
}
export async function postRequstImages(params: TypePostRequestParams){
  const { url, body } = params;

  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  let formData = new FormData()
  body.forEach((image: any , index: any)=>{
    formData.append('images', image)
  })

  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  return await json
}


export async function postPositionRequest(params: TypePostRequestParams) {
  const { url, body } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }

  const { token } = JSON.parse(tokenObject)
  let formData = new FormData()

 
  formData.append('title', body.title)
  formData.append('image', body.image)
  formData.append('active', body.active)
  formData.append('restaurant', body.restaurant)
  formData.append('price', body.price)
  formData.append('description', body.description)
  formData.append('category', body.category)

  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  })
  return await json
}

export async function putRequestRestaurant(params: TypePostRequestParams) {
  const { url, body } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }

  const { token } = JSON.parse(tokenObject)
  let formData = new FormData()

  formData.append('name', body.name)
  formData.append('address', body.address)
  body?.category.forEach((elem: any) => {
    formData.append('category', elem)
  });

  body?.weeks.forEach((elem: any) => {
    formData.append('weeks', elem)
  });


  formData.append('description', body.description)
  if (body.image) {

    formData.append('image', body.image)
  }
  formData.append('phone_number', body.phone_number)
  formData.append('service_percent', body.service_percent)
  formData.append('time_from', body.time_from)
  formData.append('time_before', body.time_before)
  formData.append('price', body.price)
  formData.append('rating', body.rating)
  formData.append('state', body.state)

  const json = await fetch(BASE_URL + url, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      // 'Content-Type': 'multipart/form-data'
    },
    body: formData,
  })

  return json
}
export async function postFormRequest(params: TypePostRequestFormParams) {
  const { url, body } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)

  let formData = new FormData()
  formData.append('title', body.title)
  formData.append('restaurant', JSON.stringify(body.restaurant))
  formData.append('image', body.image)
  formData.append('price', body.price)
  formData.append('description', body.description)
  formData.append('category', body.category)
  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  })

  return await json
}

export async function postFormRestaurantsRequest(params: TypePostRequestRestaurantFormParams) {
  const { url, body } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)

  let formData = new FormData()
  formData.append('name', body.name)
  formData.append('address', body.address)
  formData.append('description', body.description)
  formData.append('category', body.phone_number)
  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  })

  return await json
}

export async function putFormRequest(params: TypePutFormParams) {
  const { url, id, body } = params
  let formData = new FormData()
  formData.append('title', body.title)
  formData.append('image', body.image)
  formData.append('restaurant', JSON.stringify(body.restaurant))
  formData.append('price', body.price)
  formData.append('description', body.description)
  formData.append('category', body.category)

  await fetch(`${BASE_URL + url + id}/`, {
    method: 'PUT',
    body: formData,
  }).then((response) => {
    if (response.ok) {
      return response
    }
  })
}

export async function putRequest(params: TypePutRequestParams) {
  const { url, body, id } = params
  const name = {
    name: body
  };

  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }

  const { token } = JSON.parse(tokenObject)
  await fetch(BASE_URL + url + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(name)
  })
}

export async function putPositionRequest(params: TypePutRequestParams) {
  const { url, body, id } = params


  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  let formData = new FormData()

  formData.append('title', body.title)
  if(body.image) {
    formData.append('image', body.image)
  }
  formData.append('active', body.active)
  formData.append('restaurant', body.restaurant)
  formData.append('price', body.price)
  formData.append('description', body.description)
  formData.append('category', body.category)

  const { token } = JSON.parse(tokenObject)

  await fetch(`${BASE_URL + url + id}/`, {
    method: 'PUT',
    body: formData,
  }).then((response) => {
    if (response.ok) {
      return response
    }
  })

}

export async function getRequest(params: TypeGetRequestParams) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)

  const response = await fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return await response.json()
}



export async function getMyProfileRequest(params: TypeGetRequestParams) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)

  const response = await fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return await response.json()
}
export async function getRestaurant(params: TypeGetRequestParams) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)

  const response = await fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  return await response.json()
}


export async function getXLSData(params: TypeOrderExport) {
  const { url, body } = params
  let formData = new FormData()
  formData.append('id', body.id), 
  formData.append('created_at', body.created_at)
  formData.append('first_name', body.user.first_name)
  formData.append('last_name', body.user.last_name)
  formData.append('total_price', body.total_price)
  formData.append('return_order_status', body.return_order_status)
  formData.append('table_title', body.table_title)

  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  const data = [{
    created_at: body.created_at,
    id: body.id,
    last_name: body.user.last_name,
    first_name: body.user.first_name,
    total_price: body.total_price,
    return_order_status: body.return_order_status,
    table_title: body.table_title
  }]

  const response = await fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data)
  });
  return await response.json()
}



export async function getMainInformationRequest(params: TypeGetMainInformation) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  const response = await fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}
export async function getSearchRequest(params: TypeGetSearchRequestParams) {
  const { url, keyword } = params
  const sh = '?search='
  const response = await fetch(BASE_URL + url + sh + keyword)
  return await response.json()
}

export async function deleteRequest(params: TypeDeleteRequestParams) {
  const { url, id } = params
  await fetch(BASE_URL + url + id, {
    method: 'DELETE',
  })
}
export async function deleteCategoryRequest(params: TypeDeleteRequestParams) {
  const { url, id } = params
  await fetch(BASE_URL + url + id,{
    method: 'DELETE', // почему пост для удаления
  })
}
export async function deleteLogoRequest(params: TypeDeleteLogoRequest) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }

  const { token } = JSON.parse(tokenObject)
  await fetch(BASE_URL + url, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    }
  })
}
export async function putTableRequest(params: TypePutRequestParams) {
  const { url, body, id } = params
  const title = {
    title: body
  };
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }

  const { token } = JSON.parse(tokenObject)

  await fetch(BASE_URL + url + id+'/', {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(title),
  })
}

export async function deleteRequestTable(params: TypeDeleteRequestParams) {
  const { url, id } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }

  const { token } = JSON.parse(tokenObject)

  const json = await fetch(BASE_URL + url + id, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return await json.json()
}

export async function FullReturnOrderRequest(params: TypeDeleteRequestParams) {
  const { url, id } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }

  const { token } = JSON.parse(tokenObject)

  const json = await fetch(BASE_URL + url + id+'/', {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return await json.json()
}
export async function PartialReturnOrderRequest(params: IR) {
  const { url, body} = params
    let formData = new FormData()
  formData.append('order_item_id', body.order_item_id)
  formData.append('quantity', body.quantity)

  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }

  const data = [{
    order_item_id: body.order_item_id,
    quantity: body.quantity
  }]

  const { token } = JSON.parse(tokenObject)
  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return await json.json()
}
// post categoy
export async function postCategory(params: TypePostCategory) {
  const { url, body } = params
  const name = {
    name: body
  };
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(name),
  })

  return await json
}

export async function postSetState(params: any) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })

  return await json
}

export async function postTimerRequest(params: any) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })

  return await json
}


export async function postActiveOrderItem(params: TypeGetRequestParams) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })

  return await json
}
//
export async function postTable(params: TypePostCategory) {
  const { url, body } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  })

  return await json
}

export async function exitAdmin(params: TypeGetRequestParams) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  const json = await fetch(BASE_URL + url, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })

  return await json
}
export async function getOrdersRequest(params: TypeGetMainInformation) {
  const { url } = params
  const tokenObject = localStorage.getItem('userToken')
  if (!tokenObject) {
    throw Error('Token does not exist')
  }
  const { token } = JSON.parse(tokenObject)
  const response = await fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return response.json()
}
