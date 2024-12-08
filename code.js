// helper function that takes a list of cities, a start city, our distance matrix, and a set used for memoization, to recursively find the shortest path
function hk(cities, start, distance_matrix, memoization) {
    // number of cities in current call
    let numberOfCities = cities.length;

    // generate a unique memoization key to track if path has already been checked, and return value already calculated if so. chatGPT assisted line to make a unique key by converting arrat to string by joining all elements with a comma and appending our start
    let memoizationKey = cities.sort().join(",") + "-" + start;
    if (memoization[memoizationKey] != undefined) {
        return memoization[memoizationKey];
    }

    // if we only have 2 cities in current call of cities, determine which city is the start and which is the end, and then return the value stored in the distance matrix of the two
    if (numberOfCities == 2) {
        let end;
        if (cities[0] == start) {
            end = cities[1];
        }
        else {
            end = cities[0];
        }

        return distance_matrix[start][end];
    }

    // initialize our shortest path to infinity
    let shortestPath = Infinity;

    // loop through all cities in our list excluding our start city, as detailed in psuedocode
    for (let i = 0; i < numberOfCities; i++) {
        let currentCity = cities[i];
        // exclude start city
        if (currentCity == start) {
            continue;
        }
        
        // initialize array of unmarked cities
        let unmarkedCities = [];

        // original version of loop below used filter function to create arrays without our current start city to be used in call, but was incorrectly generating. likely user error but nevertheless code below worked much better (aided by DJReflexive's implementation)

        // for each new start position (iteration of outer loop) loop over all other cities
        for (let j = 0; j < numberOfCities; j++) {
            // exclude our current start node
            if (cities[j] == start) {
                continue;
            }
            // add all other cities to unmarked
            unmarkedCities.push(cities[j]);
        }

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
    // number of cities
    let numberOfCities = distance_matrix.length;
    // base cases, if no cities path is 0, if only 1 city path is 0
    if (numberOfCities == 0 || numberOfCities == 1) {
        return 0;
    }
    
    // initialize our memoization object as an empty set
    let memoization = {};
    // initialize variable to track shortest path
    let shortestPath = Infinity;
    
    // replaced original cities array generation with iterative approach that calls helper function for every start position in the original list instead of just once (aided by DJReflexive's implementation)

    // outer loop over all cities to make an array with each unique city as the start
    for (let start = 0; start < numberOfCities; start++) {
        let cities = [];

        // inner loop to add all cities to our array
        for (let city = 0; city < numberOfCities; city++) {
            cities.push(city);
        }   

        // call helper function with our start set to current outer loop and the array generated at our current innner loop as our array of cities
        let currentPath = hk(cities, start, distance_matrix, memoization);
            
        // if path returned to current path by our helper function is less than our current shortest path, place in shortest path
        if (currentPath < shortestPath) {
            shortestPath = currentPath;
        }
        
    }

    return shortestPath;
}

let dm = [[0,3,4,2,7],
[3,0,4,6,3],
[4,4,0,5,8],
[2,6,5,0,6],
[7,3,8,6,0]];

console.log(tsp_hk(dm));