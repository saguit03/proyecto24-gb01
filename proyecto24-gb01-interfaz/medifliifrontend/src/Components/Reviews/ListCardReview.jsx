import React from 'react'
import CardReview from './CardReview'

export default function ListCardReview({listReviews}) {
  return (
            <div className="mt-4">
                            <h4>Lista de reviews</h4>
                            <div className="list-group">
                                {listReviews.map((review) => (
                                    <CardReview review={review}/>
                                ))}
                            </div>
                        </div>
          
  )
}
