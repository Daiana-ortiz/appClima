window.addEventListener("load", () => {
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')
    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')
    let vientoVelocidad = document.getElementById('viento-velocidad')

    //si el objeto existe, los servicios de geolocalizacion existen
    if(navigator.geolocation){
        //obtenemos la posicion del dispositivo
        navigator.geolocation.getCurrentPosition( posicion => {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude

            // ubicacion actual
            //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=45cc04a0154bcd4b0a2eb2d182e79b6e`
        
            // por ciudad 
            const url = `https://api.openweathermap.org/data/2.5/weather?q=Avellaneda&lang=es&units=metric&appid=45cc04a0154bcd4b0a2eb2d182e79b6e`
            console.log(url)

            // hago el fetch 
            fetch(url)
            // lo pasamos a formato json
            .then(response => { return Response.json})
            .then(data => {
                // redondeamos la temperatura
                let temp = Math.round(data.main.temp)
                temperaturaValor.textContent =  `${temp} °C`
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                
                ubicacion.textContent = data.name
                vientoVelocidad.textContent = `${data.wind.speed} m/s`


            })

            // si hay error, mostrame por consola
            .catch(error => {
                console.log(error)
            })
        })
    }
})