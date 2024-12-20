# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

Original version of code was written by me, and attempted to debug with chatGPT. Kept having issues so searched other students answers for someone who took a similar approach to the problem since the students I'm in contact with all used a different strategy. Eventually found DJReflexives implementation which used the same approached. Compared to see where issues were arising for me. Eventually found that my list generation for unmarked cities was the problem. Changed mine from a filter function to the iterative approach used by DJReflexive and got code working.

In summary I used DJReflexives implementation to debug list generation, and ChatGPT very briefly to help with how best to store my memoization.

All lines that had outside sources have been marked in comments within code.

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

I was a bit lost on the asymptotic analysis of this so I consulted ChatGPT. I mostly just forgot everything I learned about subsets in my discrete class already and needed a refresher.

The total time complexity of my implementation in $\Theta$(n<sup>2</sup> * 2<sup>n</sup>). This is found because our starting tsp_hk function calls the hk function $\Theta$(n) times, once for each possible starting city. The hk function itself is recursive, calling itself for every subset of the cities its called with, the number of subsets being 2<sup>n</sup>. For each subset we iterate over each city in it, meaning an aditional n times of work for hk. Thus our asymptotic complexity for hk is $\Theta$(n * 2<sup>n</sup>), which when called $\Theta$(n) times gives us our final complexity of $\Theta$(n<sup>2</sup> * 2<sup>n</sup>). 

Note: because of our memoization we save time by returning repetitive recursive calls before they must do the n amount of work within, however the amount of recursive calls that do n work is still linear to n, so complexity doesnt change
