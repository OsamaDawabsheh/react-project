import axios from 'axios'
import { useEffect, useState } from 'react'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { Bounce, toast } from 'react-toastify'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { object, string } from 'yup'
import { useCartContext } from '../../../hooks/use-cart'
import { useLoadingContext } from '../../../hooks/use-loading'
import * as styles from './ProductDetails.module.css'

function ProductDetails() {
	const { id } = useParams()

	const [errors, setErrors] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isReviewLoading, setIsReviewLoading] = useState(false)
	const [productDetails, setProductDetails] = useState({})
	const [avgRating, setAvgRating] = useState(0)
	const [review, setReview] = useState({
		comment: '',
		rating: '',
	})
	const token = localStorage.getItem('userToken')
	const { addToCart } = useCartContext()
	const { loading } = useLoadingContext()

	const getProductsDetails = async () => {
		setIsLoading(true)
		try {
			const { data } = await axios.get(`/products/${id}`)
			setProductDetails(data.product)
			setAvgRating(data.avgRating)
		} catch (error) {
			setErrors(true)
			console.log(error.errors)
		} finally {
			setIsLoading(false)
		}
	}

	const dataValidation = async () => {
		let reviewSchema = object({
			comment: string().required(),
			rating: string().required(),
		})
		try {
			await reviewSchema.validate(review, await { abortEarly: true })
			return true
		} catch (error) {
			console.log(error)
			toast.error(error.message, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				transition: Bounce,
			})

			return false
		}
	}

	const submitReview = async e => {
		e.preventDefault()
		const isValid = await dataValidation()
		if (isValid) {
			setIsReviewLoading(true)
			try {
				const { data } = await axios.post(` /products/${id}/review`, review, {
					headers: {
						Authorization: `Tariq__${token}`,
					},
				})
				if (data.message === 'success') {
					toast.success('review send successfly', {
						position: 'top-right',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
						transition: Bounce,
					})
					getProductsDetails()
				}
			} catch (error) {
				toast.error(error.response.data.message, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
					transition: Bounce,
				})
			} finally {
				setIsReviewLoading(false)
			}
		}
	}

	const handleComment = e => {
		const { name, value } = e.target
		setReview({ ...review, [name]: value })
	}

	const handleRating = rate => {
		setReview({ ...review, ['rating']: rate })
	}

	useEffect(() => {
		getProductsDetails()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="container ">
			<h1 className="mt-3 mb-5 text-center">Product</h1>
			{isLoading ? (
				<div className={'p-5 m-4 d-flex align-items-center justify-content-center flex-column gap-3 main'}>
					<div className={`spinner-border`} role="status"></div>
					<span className="sr-only fs-5 fw-bold">Loading...</span>
				</div>
			) : errors ? (
				<div className="py-5 main">
					<div className="d-flex gap-3 justify-content-center align-items-center text-danger">
						<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24">
							<path className={styles.errorIcon} fill="currentColor" d="M11.001 10h2v5h-2zM11 16h2v2h-2z" />
							<path
								className={styles.errorIcon}
								fill="currentColor"
								d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"
							/>
						</svg>
						<h1>Error happened when trying to get data</h1>
					</div>
				</div>
			) : productDetails.mainImage === undefined ? (
				''
			) : (
				<>
					<div className={`flex-wrap row  py-2 px-4 ${styles.productDetails}`}>
						<Swiper
							modules={[Navigation, Pagination, Scrollbar]}
							speed={1000}
							slidesPerView={1}
							navigation
							className={`px-3 ${styles.swiperExtensions} px-2 py-2 m-auto  col-lg-4 col-md-5 col-sm-6`}
							spaceBetween={30}
						>
							<SwiperSlide key={productDetails.mainImage.public_id} className="d-flex justify-content-center w-100  ">
								<img className="w-100 rounded-5" src={productDetails.mainImage.secure_url} alt="category image" />
							</SwiperSlide>
							{productDetails.subImages.map(subImage => (
								<SwiperSlide key={subImage.public_id} className="d-flex justify-content-center w-100">
									<img className="w-100 rounded-5" src={subImage.secure_url} alt="product image" />
								</SwiperSlide>
							))}
						</Swiper>

						<div className="d-flex flex-column px-5 py-4 gap-5 justify-content-between col-lg-8 col-md-7 col-sm-12">
							<div className="d-flex flex-column justify-content-between h-100 gap-5">
								<div className="d-flex flex-column gap-4">
									<h3 className="">{productDetails.name}</h3>
									<p className={`productDescription ${styles.productDescription}`}>{productDetails.description}</p>
									<div className="d-flex align-items-center justify-content-between">
										<span className={`bg-primary text-light fw-bold fs-5 rounded-5 px-3 py-2`}>
											{productDetails.price} $
										</span>
										<div className="d-flex gap-2 align-items-center bg-primary px-3 py-1 rounded-5">
											<span className="fs-5 fw-bold text-light">{avgRating.toFixed(2)}</span>
											<svg
												version="1.1"
												xmlns="http://www.w3.org/2000/svg"
												width="32"
												height="32"
												viewBox="0 0 32 32"
												fill="#f1a545"
											>
												<title>star-full</title>
												<path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
											</svg>
										</div>
									</div>
								</div>
								{token ? (
									<button
										onClick={() => addToCart(productDetails.id)}
										type="submit"
										className="border-0 rounded-5 py-2 bg-warning fw-bold w-100"
										disabled={loading.addToCart}
									>
										{loading.addToCart ? <div className="spinner-border" role="status"></div> : 'Add To Cart'}{' '}
									</button>
								) : (
									''
								)}
							</div>
						</div>
					</div>

					<hr className="mt-5" />

					<div>
						<h2 className="text-center my-5">Reviews</h2>
						<form action="" onSubmit={submitReview}>
							<div className="p-4 d-flex flex-wrap align-items-center justify-content-between gap-3 w-100 bg-warning text-dark rounded-5 mb-3">
								<input
									type="text"
									name="comment"
									id="comment"
									placeholder="add comment"
									className="px-3 py-2 rounded-5 border-0 flex-grow-1 "
									value={review.comment}
									onChange={handleComment}
								/>
								<Rating
									onClick={handleRating}
									ratingValue={review.rating}
									size={30}
									label
									transition
									fillColor="#007aff"
									emptyColor="gray"
								/>
								<button
									type="submit"
									className="border-0 py-2 px-3 btn btn-primary rounded-5 "
									disabled={isReviewLoading ? 'disabled' : ''}
								>
									{isReviewLoading ? <div className="spinner-border" role="status"></div> : 'Send'}{' '}
								</button>
							</div>
						</form>
						<div>
							<div className="d-flex flex-column gap-3   ">
								{productDetails.reviews ? (
									productDetails.reviews.map(review => (
										<div
											key={review._id}
											className="px-4 py-2 d-flex flex-column gap-2 w-100 bg-primary text-light rounded-5"
										>
											<div className="d-flex justify-content-between">
												<div className="d-flex gap-3 align-items-center">
													<img
														src={review.createdBy.image.secure_url}
														alt="user image"
														width={50}
														height={50}
														className="object-fit-cover rounded-5 border border-warning border-2"
													/>
													<h6 className="text-warning">{review.createdBy.userName}</h6>
												</div>
												<div className="d-flex align-items-center">
													{[
														[...Array(Math.floor(review.rating))].map((e, i) => (
															<svg
																version="1.1"
																xmlns="http://www.w3.org/2000/svg"
																width="25"
																height="25"
																viewBox="0 0 32 32"
																fill="#f1a545"
																key={i}
															>
																<title>star rating</title>
																<path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
															</svg>
														)),
													]}
												</div>
											</div>
											<div className="m-auto w-75">
												<p className="">{review.comment}</p>
											</div>
										</div>
									))
								) : (
									<div className="mt-5 d-flex justify-content-center">
										<h4 className="text-secondary">No reviews</h4>
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default ProductDetails
