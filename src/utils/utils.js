import moment from 'moment';

export const filterTicketMasterEvents = (events, interestedEvents) => {
    let eventsArray = [];
    let geoJSONFeatureArray = [];
    events.map(event => {
    try {
        //Only store required details from ticketmaster response
        let eventInfo = {
            id: event.id || "bad_id",
            isInterested: interestedEvents.has(event.id) ? true : false,
            name: event.name || "Untitled Event",
            classification: event.classifications === undefined ? [] : {
                segment: event.classifications[0].segment.name,
                genre: event.classifications[0].genre.name
            },
            date: {
                startTime: event.dates.start.localTime === undefined ? "" : moment(event.dates.start.localTime, 'HH:mm:ss').format("hA"),
                startDate: event.dates.start.localDate === undefined ? "" : moment(event.dates.start.localDate).format("ddd, MMM Do, YYYY"),
            },
            images: event.images || [],
            url: event.url || "",
            venue: event._embedded.venues[0].name || "",
            distance: event._embedded.venues[0].distance === undefined ? "" : `${event._embedded.venues[0].distance} miles away`,
            address: event._embedded.venues[0].address.line1 || "",
            city: event._embedded.venues[0].city || "",
            state: event._embedded.venues[0].state || {},
            location: event._embedded.venues[0].location || { latitude: 40.730610, longitude: -73.935242 },
            parking: event._embedded.venues[0].parkingDetail || "",
            priceRange: event.priceRanges === undefined ? "" : `$${event.priceRanges[0].min} - $${event.priceRanges[0].max}`,
            postalCode: event._embedded.venues[0].postalCode || ""
        }
        eventsArray.push(eventInfo);

        let geoJSON = {
            type: 'Feature',
            properties: {
                title: event.name || 'Untitled Event',
                icon: 'harbor',
                id: event.id || 'bad_id',

            },
            geometry: {
              type: 'Point',
              coordinates: [ parseFloat(event._embedded.venues[0].location.longitude), parseFloat(event._embedded.venues[0].location.latitude)]
            }
        };
        geoJSONFeatureArray.push(geoJSON);


    } catch (error) {
        console.log("An error for ", event, error)
    }

    })
    return { eventsArray, geoJSONFeatureArray };
}