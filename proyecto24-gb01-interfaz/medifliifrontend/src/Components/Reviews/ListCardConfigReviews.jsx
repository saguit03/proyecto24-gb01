import React from 'react'
import CardConfigReview from './CardConfigReview'

export default function ListCardConfigReviews({listReviews}) {
  return (
              <div className="mt-4">
                              <h4>Lista de reviews</h4>
                              <div className="list-group">
                                  {listReviews.map((review) => (
                                      <CardConfigReview review={review}/>
                                  ))}
                              </div>
                          </div>
            
    )
}
