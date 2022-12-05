import React from 'react'
import amy from './images/avatars/image-amyrobson.png'
import reply from './images/icon-reply.svg'
import plus from './images/icon-plus.svg'
import minus from './images/icon-minus.svg'
import data from './Data'
import { useEffect, useState } from 'react'

const Oldwork = () => {
  const [general, setGeneral] = useState([])
  const [info, setInfo] = useState(data)
  const [commentbar, setCommentbar] = useState(0)
  const [vote, setVote] = useState('')
  const [comment, setComment] = useState([])
  const [commentreplied, setCommentreplied] = useState('')

  // handleing voting
  const handleminus = (id) => {
    // info.comments.map((item) => {
    //   if (item.id === id) {
    //     item.score = item.score - 1
    //     if (item.score < 0) {
    //       item.score = 0
    //     } else item.score = item.score
    //     setVote(item.score)
    //     return item.score
    //   }
    // })
  }

  const handleminus1 = (id) => {
    info.comments.map((item) => {
      item.replies.map((item) => {
        if (item.id === id) {
          item.score = item.score - 1
          if (item.score < 0) {
            item.score = 0
          } else item.score = item.score
          setVote(item.score)
          console.log(id)
          // console.log(index)
          return item.score
        }
      })
    })
  }

  // handle plus
  const handleplus = (id) => {
    // info.comments.map((item) => {
    //   if (item.id === id) {
    //     item.score = item.score + 1
    //     item.score = item.score
    //     setVote(item.score)
    //     return item.score
    //   }
    // })
  }

  const handleplus1 = (id) => {
    info.comments.map((item) => {
      item.replies.map((item) => {
        if (item.id === id) {
          item.score = item.score + 1
          item.score = item.score
          setVote(item.score)
          return item.score
        }
      })
    })
  }

  // comment submission
  const handlesubmit = (id) => {
    setCommentbar(0)
    info.comments.map((item) => {
      if (item.id === id) {
        const newreply = {
          content: commentreplied,
          createdAt: '1 week ago',
          replyingTo: item.user.username,
          core: 1,
          id: new Date().getTime().toString(),
          image: info.currentUser.image.png,
          username: info.currentUser.username,
        }
        item.replies = [...item.replies, newreply]
      }
      return item.replies
    })
  }
  useEffect(() => {
    setComment(info)
  }, [])

  console.log(commentbar)
  return (
    <>
      {/* section container */}
      <section className='font-sans bg-veryLightGray min-h-screen flex flex-col justify-center items-center py-4 md:py-6 lg:py-10 px-4 space-y-14'>
        {info
          ? info.comments.map((item, index) => {
              const { content, createdAt, id, replies, score, user } = item
              return (
                <div className='space-y-2 flex-col justify-center items-center max-w-xs md:max-w-md lg:max-w-lg '>
                  {/* comment section */}
                  <div className='bg-white rounded-md shadow-md px-4 py-4 md:py-5 md:px-6  '>
                    {/* large screen  comment  */}
                    <div className='flex gap-6'>
                      {/* rating */}
                      <div className='hidden md:flex flex-col justify-center px-2 py-1 items-center gap-5 bg-veryLightGray w-20 rounded-md '>
                        <img
                          src={minus}
                          alt=''
                          onClick={() => handleminus(id)}
                          className='cursor-pointer '
                        />
                        <h1 className='font-bold text-lg'>{score}</h1>
                        <img
                          src={plus}
                          alt=''
                          className='cursor-pointer '
                          onClick={() => handleplus(id)}
                        />
                      </div>
                      {/* small screen */}
                      <div className='space-y-2 md:space-y-4'>
                        {/* header */}
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center justify-start gap-4'>
                            <img
                              src={user.image.png}
                              alt=''
                              className='w-10 md:w-12'
                            />
                            <h1 className='font-sans font-semibold text-sm text-darkBlue md:text-base'>
                              {user.username}
                            </h1>
                            <h1 className='text-xs text-grayishBlue'>
                              {createdAt}
                            </h1>
                          </div>
                          {/* reply */}
                          <div
                            className='md:flex items-center gap-2 hidden cursor-pointer'
                            onClick={() => setCommentbar(id)}
                          >
                            <img src={reply} alt='' />
                            <h1 className='text-blue'>Reply</h1>
                          </div>
                        </div>
                        {/* text */}
                        <div>
                          <h1 className='text-xs leading-5 text-grayishBlue md:text-sm'>
                            {content}
                          </h1>
                        </div>
                        {/* footer */}
                        <div className='flex justify-between items-center'>
                          {/* rating */}
                          <div className='flex justify-center px-1 py-1 items-center gap-3 bg-veryLightGray w-20 rounded-md md:hidden'>
                            <img
                              src={minus}
                              alt=''
                              onClick={() => handleminus(id)}
                              className='cursor-pointer '
                            />
                            <h1 className='font-bold text-base'>{score}</h1>
                            <img
                              src={plus}
                              alt=''
                              className='cursor-pointer '
                              onClick={() => handleplus(id)}
                            />
                          </div>
                          {/* reply */}
                          <div
                            className='flex items-center gap-2 md:hidden cursor-pointer '
                            onClick={() => setCommentbar(id)}
                          >
                            <img src={reply} alt='' />
                            <h1 className='text-blue'>Reply</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* line comement */}
                  <div className='flex '>
                    {/* line */}
                    {commentbar === id ? (
                      <div className='border border-l md:border-l-2 border-l-lightGrayishBlue border-r-0 ml-6 '></div>
                    ) : (
                      ''
                    )}
                    {/* reply div */}
                    <div className='flex-col space-y-3 justify-end  pl-0  '>
                      {/* reply section */}
                      {replies.map((item, index) => {
                        const {
                          content,
                          createdAt,
                          id,
                          replyingTo,
                          score,
                          user,
                        } = item
                        return (
                          // reply and reply comment
                          <div className='space-y-2'>
                            {/* reply */}
                            <div className='bg-white rounded-md shadow-md px-4 py-4 md:py-5 md:px-6   ml-8 md:ml-6 lg:ml-12  '>
                              {/* large screen  reply  */}
                              <div className=' flex  gap-6'>
                                {/* rating */}
                                <div className='hidden md:flex flex-col justify-center px-2 py-1 items-center gap-5 bg-veryLightGray w-20 rounded-md '>
                                  <img
                                    src={minus}
                                    alt=''
                                    className='cursor-pointer'
                                    onClick={() => handleminus1(id)}
                                  />
                                  <h1 className='font-bold text-lg'>{score}</h1>
                                  <img
                                    src={plus}
                                    alt=''
                                    className='cursor-pointer'
                                    onClick={() => handleplus1(id)}
                                  />
                                </div>
                                {/* small screen */}
                                <div className=' space-y-2 md:space-y-4'>
                                  {/* header */}
                                  <div className='flex justify-between items-center'>
                                    <div className='flex items-center justify-start gap-4'>
                                      <img
                                        src={user.image.png}
                                        alt=''
                                        className='w-10 md:w-12'
                                      />
                                      <h1 className='font-sans font-semibold text-sm text-darkBlue md:text-base'>
                                        {user.username}
                                      </h1>
                                      <h1 className='text-xs text-grayishBlue'>
                                        {createdAt}
                                      </h1>
                                    </div>
                                    {/* reply */}
                                    <div
                                      className='md:flex items-center gap-2 hidden cursor-pointer'
                                      onClick={() => setCommentbar(id)}
                                    >
                                      <img src={reply} alt='' />
                                      <h1 className='text-blue cursor-pointer'>
                                        Reply
                                      </h1>
                                    </div>
                                  </div>
                                  {/* text */}
                                  <div>
                                    <h1 className='text-xs leading-5 text-grayishBlue md:text-sm'>
                                      {content}
                                    </h1>
                                  </div>
                                  {/* footer */}
                                  <div className='flex justify-between items-center'>
                                    {/* rating */}
                                    <div className='flex justify-center px-1 py-1 items-center gap-3 bg-veryLightGray w-20 rounded-md md:hidden'>
                                      <img
                                        src={minus}
                                        alt=''
                                        className='cursor-pointer'
                                        onClick={() => handleminus1(id)}
                                      />
                                      <h1 className='font-bold text-base'>
                                        {score}
                                      </h1>
                                      <img
                                        src={plus}
                                        alt=''
                                        className='cursor-pointer'
                                        onClick={() => handleplus1(id)}
                                      />
                                    </div>
                                    {/* reply */}
                                    <div className='flex items-center gap-2 md:hidden cursor-pointer'>
                                      <img src={reply} alt='' />
                                      <h1 className='text-blue cursor-pointer'>
                                        Reply
                                      </h1>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {commentbar === id ? (
                              <div className='bg-white shadow-md rounded-md px-4 py-4 md:py-5 md:px-6 ml-8 md:ml-6 lg:ml-12 '>
                                {/* input container */}
                                <div className='space-y-2 md:flex md:justify-between md:items-start md:space-y-0'>
                                  {/* image md */}
                                  <div className='flex justify-between items-center'>
                                    <img
                                      src={info.currentUser.image.png}
                                      alt=''
                                      className='w-12 hidden md:block'
                                    />
                                  </div>
                                  {/* input */}
                                  <div className='md:w-2/3'>
                                    <input
                                      type='text'
                                      placeholder='Add'
                                      className='font-sans text-xs font-light h-20 border rounded-md border-lightGrayishBlue 
                  outline-lightGrayishBlue
                  w-full text-center px-2 py-1'
                                      value={commentreplied}
                                      onChange={(e) =>
                                        setCommentreplied(e.target.value)
                                      }
                                    />
                                  </div>
                                  {/* image and send */}
                                  <div className='flex justify-between items-center'>
                                    <img
                                      src={amy}
                                      alt=''
                                      className='w-8 md:hidden'
                                    />
                                    <button
                                      onClick={() => handlesubmit(id)}
                                      className='px-2 py-1 md:py-2 md:px-4 md:rounded-md bg-blue text-white rounded-sm text-sm font-light'
                                    >
                                      Send
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* input ur comment */}
                  {commentbar === id ? (
                    <div className='bg-white shadow-md rounded-md px-4 py-4 md:py-5 md:px-6 '>
                      {/* input container */}
                      <div className='space-y-2 md:flex md:justify-between md:items-start md:space-y-0'>
                        {/* image md */}
                        <div className='flex justify-between items-center'>
                          <img
                            src={info.currentUser.image.png}
                            alt=''
                            className='w-12 hidden md:block'
                          />
                        </div>
                        {/* input */}
                        <div className='md:w-2/3'>
                          <input
                            type='text'
                            placeholder='Add comment here'
                            value={commentreplied}
                            onChange={(e) => setCommentreplied(e.target.value)}
                            className='font-sans text-xs font-light h-20 border rounded-md border-lightGrayishBlue 
                  outline-lightGrayishBlue
                  w-full  px-2 py-1'
                          />
                        </div>
                        {/* image and send */}
                        <div className='flex justify-between items-center'>
                          <img
                            src={info.currentUser.image.png}
                            alt=''
                            className='w-8 md:hidden'
                          />
                          <button className='px-2 py-1 md:py-2 md:px-4 md:rounded-md bg-blue text-white rounded-sm text-sm font-light'>
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )
            })
          : ''}
      </section>
    </>
  )
}

export default Oldwork
