// helper function that takes a list of cities, a start city, our distance matrix, and a set used for memoization, to recursively find the shortest path
function hk(cities, start, distance_matrix, memoization) {
    // if we only have 2 cities in current call of cities, determine which city is the start and which is the end, and then return the value stored in the distance matrix of the two
    if (cities.length == 2) {
        let end;
        if (cities[0] == start) {
            end = cities[1];
        }
        else {
            end = cities[0];
        }

        return distance_matrix[start][end];
    }

    // create a unique key for our current call of cities and start. got the idea for generating a unique key for each subproblem using this line from chatGPT
    let memoizationKey = cities.join(",") + "-" + start;
    // if we've already checked this subproblem, ie there already exists a value stored at this key, return that value
    if (memoization[memoizationKey] != undefined) {
        return memoization[memoizationKey];
    }

    // initialize our shortest path to infinity
    let shortestPath = Infinity;

    // loop through all cities in our list excluding our start city, as detailed in psuedocode
    for (let i = 0; i < cities.length; i++) {
        // set our current city to be city at index i
        let currentCity = cities[i];
        // exclude start city
        if (currentCity == start) {
            // use fancy new keyword I just learned that skips individual iterations of a loop
            continue;
        }
        // initialize a new set of cities to be used in recursive call that excludes our current city using a higher order filter function (learned in functional)
        let unmarkedCities = cities.filter(city => city != currentCity);

        // calculate path distance by recursive call with our new smaller list of cities, and our current city set as the start. add whatever is returned by this call with the distance from our current start to our current city to find path distance
        let pathDistance = hk(unmarkedCities, currentCity, distance_matrix, memoization) + distance_matrix[start][currentCity];

        // check if our path is shorter than what is currently the shortest path
        if (pathDistance < shortestPath) {
            // if so, set shortest path to be this path
            shortestPath = pathDistance;
        }
    }

    // memoize this shortest path by adding it to memoization at its unique key
    memoization[memoizationKey] = shortestPath;
    //return shortest path
    return shortestPath;
}

function tsp_hk(distance_matrix) {
    // initialize a list of cities using the keys along the length of the distance matrix
    let cities = [...Array(distance_matrix.length).keys()];
    // initialize start to city 0
    let start = 0;
    // initialize our memoization object as an empty set
    let memoization = {};

    // call our helper function with our initial variables, return its result
    return hk(cities, start, distance_matrix, memoization);
}
