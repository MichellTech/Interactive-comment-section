import React from 'react'
import reply from './images/icon-reply.svg'
import plus from './images/icon-plus.svg'
import minus from './images/icon-minus.svg'
import editBtn from './images/icon-edit.svg'
import deleteBtn from './images/icon-delete.svg'
import data from './Data'
import { useState } from 'react'

const Newwork = () => {
  const [info, setInfo] = useState(data)
  const [replyvalue, setReplyvalue] = useState('')
  const [hideform, setHideform] = useState(false)
  const [formid, setFormid] = useState(0)
  const [postid, setPostid] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [vote, setVote] = useState([])
  const [modal, setModal] = useState(false)
  const [delteID, setDeleteID] = useState(null)
  const [deltemainitem, setDeletmainitem] = useState(null)
  const [delteseconditem, setDeletseconditem] = useState(null)

  // submitting for
  const handleSubmit = (e, id, selecteditem) => {
    e.preventDefault()
    if (!replyvalue) {
    } else if (replyvalue && isEditing) {
      setInfo((previousinfo) => ({
        ...previousinfo,
        comments: previousinfo.comments.map((item) => {
          if (item.id === selecteditem.id) {
            item.replies.map((item) => {
              if (item.id === editID) {
                item.content = replyvalue
                return item.content
              }
            })
            return item
          }
          return item
        }),
      }))
      setHideform(false)
      setReplyvalue('')
      setIsEditing(false)
    } else {
      info.comments.map((item) => {
        if (item.id === id) {
          const timeElapsed = Date.now()
          const today = new Date(timeElapsed)
          const newreply = {
            id: new Date().getTime().toString(),
            content: replyvalue,
            createdAt: today.toDateString(),
            replyingTo: item.user.username,
            score: 1,
            image: data.currentUser.image.png,
            username: data.currentUser.username,
          }
          item.replies = [...item.replies, newreply]
          return item.replies
        }
      })
      setPostid(id)
      setHideform(false)
      setReplyvalue('')
    }
  }

  const handleSubmit1 = (e, id, selecteditem, seconditem, mainitem) => {
    e.preventDefault()
    if (!replyvalue) {
    } else if (replyvalue && isEditing) {
      setInfo((previousinfo) => ({
        ...previousinfo,
        comments: previousinfo.comments.map((item) => {
          if (seconditem.id.length) {
            if (item.id === selecteditem.id) {
              item.replies.map((item) => {
                if (item.id === seconditem.id) {
                  item.content = replyvalue
                }
              })
              return item
            }
          } else {
            if (item.id === selecteditem.id) {
              item.replies.map((item) => {
                if (item.id === seconditem.id) {
                  item.repliedTo.map((item) => {
                    if (item.id === id) {
                      item.content = replyvalue
                    }
                  })
                }
              })
              return item
            }
          }

          return item
        }),
      }))
      setHideform(false)
      setReplyvalue('')
      setIsEditing(false)
    } else
      info.comments.map((item) => {
        item.replies.map((item) => {
          if (item.id === id) {
            const timeElapsed = Date.now()
            const today = new Date(timeElapsed)
            const newreply = {
              id: new Date().getTime().toString(),
              content: replyvalue,
              createdAt: today.toDateString(),
              replyingTo: item.user.username,
              score: 1,
              image: data.currentUser.image.png,
              username: data.currentUser.username,
            }
            item.repliedTo = [...item.repliedTo, newreply]
          }
        })
      })

    setHideform(false)
    setReplyvalue('')
  }

  const removeitem = (id, selecteditem) => {
    setInfo((previousinfo) => ({
      ...previousinfo,
      comments: previousinfo.comments.map((item) => {
        if (item.id === selecteditem.id) {
          item.replies = [
            ...item.replies.filter((content) => content.id !== id),
          ]
          return item
        }
        return item
      }),
    }))
  }

  const removeitem1 = (id, selecteditem, seconditem) => {
    setInfo((previousinfo) => ({
      ...previousinfo,
      comments: previousinfo.comments.map((item) => {
        if (item.id === selecteditem.id) {
          item.replies.map((item) => {
            if (item.id === seconditem.id) {
              item.repliedTo = [
                ...item.repliedTo.filter((content) => content.id !== id),
              ]
            }
          })
        }
        return item
      }),
    }))
  }

  const editItem = (id, selecteditem) => {
    info.comments.map((item) => {
      if (item.id === selecteditem.id) {
        item.replies.map((item) => {
          if (item.id === id) {
            setReplyvalue(item.content)
          }
        })
      }
    })
    setIsEditing(true)
    setEditID(id)
    setHideform(true)
  }

  const editItem1 = (id, selecteditem, seconditem) => {
    const specificItem = info.comments.map((item) => {
      if (item.id === selecteditem.id) {
        item.replies.map((item) => {
          if (item.id === seconditem.id) {
            item.repliedTo.map((item) => {
              if (item.id === id) {
                setReplyvalue(item.content)
              }
            })

            return item
          }
        })
        return item
      }
    })
    setIsEditing(true)
    setEditID(id)
    setHideform(true)
  }

  const handleOpenForm = (id) => {
    setFormid(id)
    setHideform(true)
  }

  // handleing voting
  const handleminus = (id) => {
    info.comments.map((item) => {
      if (item.id === id) {
        item.score = item.score - 1
        if (item.score < 0) {
          item.score = 0
        } else item.score = item.score
        setVote(item.score)
        return item.score
      } else if (item.id !== id) {
        item.replies.map((item) => {
          if (item.id === id) {
            item.score = item.score - 1
            if (item.score < 0) {
              item.score = 0
            } else item.score = item.score
            setVote(item.score)

            // console.log(index)
            return item.score
          }
          if (item.id !== id) {
            item.repliedTo.map((item) => {
              if (item.id === id) {
                item.score = item.score - 1
                if (item.score < 0) {
                  item.score = 0
                } else item.score = item.score
                setVote(item.score)

                // console.log(index)
                return item.score
              }
            })
          }
        })
      }
    })
  }

  // handle plus
  const handleplus = (id) => {
    info.comments.map((item) => {
      if (item.id === id) {
        item.score = item.score + 1
        setVote(item.score)
        return item.score
      } else if (item.id !== id) {
        item.replies.map((item) => {
          if (item.id === id) {
            item.score = item.score + 1
            setVote(item.score)
            return item.score
          }
          if (item.id !== id) {
            item.repliedTo.map((item) => {
              if (item.id === id) {
                item.score = item.score + 1
                setVote(item.score)
                return item.score
              }
            })
          }
        })
      }
    })
  }

  const handleDelete = (id, mainitem, seconditem) => {
    setModal(true)
    setDeleteID(id)
    setDeletmainitem(mainitem)
    setDeletseconditem(seconditem)
    setHideform(true)
    setFormid(0)
  }

  const deletedinput = () => {
    if (delteseconditem) {
      removeitem1(delteID, deltemainitem, delteseconditem)
    } else removeitem(delteID, deltemainitem)

    setModal(false)
  }
  return (
    <>
      <div className=' relative  font-sans bg-veryLightGray min-h-screen flex flex-col justify-center items-center py-4 md:py-6 lg:py-10 px-4 space-y-14'>
        {info.comments.map((mainitem, index) => {
          const { content, createdAt, id, replies, score, user } = mainitem
          return (
            <div
              key={index}
              className='space-y-2 flex-col justify-center items-center max-w-xs md:max-w-md lg:max-w-lg '
            >
              {/* Inital Post section */}
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
                        onClick={() => handleOpenForm(id)}
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
                        onClick={() => handleOpenForm(id)}
                      >
                        <img src={reply} alt='' />
                        <h1 className='text-blue'>Reply</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* lol */}
              <div
                className='flex justify-end 
'
              >
                {/* line */}
                {hideform && formid === id ? (
                  <div className='border border-l md:border-l-2 border-l-lightGrayishBlue border-r-0 ml-6 '></div>
                ) : (
                  ''
                )}

                {/* default reply on posts*/}
                <div className='flex-col justify-end'>
                  {/* reply div */}
                  <div className='flex-col space-y-3 justify-end pl-0  '>
                    {/* reply section */}
                    {replies.map((seconditem, index) => {
                      const { content, createdAt, id, repliedTo, score, user } =
                        seconditem
                      return (
                        <div className='space-y-2'>
                          {/* // reply and reply comment */}
                          <div key={index} className='space-y-2'>
                            {/* reply */}
                            <div className='bg-white rounded-md  shadow-md px-4 py-4 md:py-5 md:px-6 md:pr-8   ml-8 md:ml-6 lg:ml-16   '>
                              {/* large screen  reply  */}
                              <div className=' flex  justify-between  gap-6'>
                                {/* rating */}
                                <div className='hidden md:flex flex-col justify-between px-2 py-3 items-center gap-5 bg-veryLightGray md:w-8 h-auto rounded-md '>
                                  <img
                                    src={minus}
                                    alt=''
                                    className='cursor-pointer'
                                    onClick={() => handleminus(id)}
                                  />
                                  <h1 className='font-bold text-lg'>{score}</h1>
                                  <img
                                    src={plus}
                                    alt=''
                                    className='cursor-pointer'
                                    onClick={() => handleplus(id)}
                                  />
                                </div>
                                {/* small screen */}
                                <div className=' space-y-2 md:space-y-4 w-full'>
                                  {/* header */}
                                  <div className='flex justify-between place-items-center w-full '>
                                    <div className='flex items-center justify-start w-full gap-4'>
                                      <img
                                        src={
                                          user
                                            ? user.image.png
                                            : data.currentUser.image.png
                                        }
                                        alt=''
                                        className='w-10 md:w-12'
                                      />
                                      <h1 className='font-sans font-semibold text-sm text-darkBlue md:text-base'>
                                        {user
                                          ? user.username
                                          : data.currentUser.username}
                                      </h1>
                                      <h1 className='text-xs text-grayishBlue'>
                                        {createdAt}
                                      </h1>
                                    </div>
                                    {/* reply */}
                                    <div
                                      className='md:flex items-center gap-4 hidden cursor-pointer'
                                      onClick={() => handleOpenForm(id)}
                                    >
                                      {user ? (
                                        <img src={reply} alt='' />
                                      ) : (
                                        <img
                                          src={editBtn}
                                          alt=''
                                          onClick={() => editItem(id, mainitem)}
                                        />
                                      )}
                                      {user ? (
                                        <h1
                                          className='text-blue'
                                          onClick={() => handleOpenForm(id)}
                                        >
                                          Reply
                                        </h1>
                                      ) : (
                                        <img
                                          src={deleteBtn}
                                          alt=''
                                          onClick={() =>
                                            handleDelete(id, mainitem)
                                          }
                                          // onClick={() => removeitem(id, mainitem)}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  {/* text */}
                                  <div className='w-full'>
                                    <h1 className='text-xs w-full leading-5 text-grayishBlue md:text-sm'>
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
                                        onClick={() => handleminus(id)}
                                      />
                                      <h1 className='font-bold text-base'>
                                        {score}
                                      </h1>
                                      <img
                                        src={plus}
                                        alt=''
                                        className='cursor-pointer'
                                        onClick={() => handleplus(id)}
                                      />
                                    </div>
                                    {/* reply */}
                                    <div className='flex items-center gap-4 md:hidden cursor-pointer'>
                                      {user ? (
                                        <img src={reply} alt='' />
                                      ) : (
                                        <img
                                          src={editBtn}
                                          alt=''
                                          onClick={() => editItem(id, mainitem)}
                                        />
                                      )}
                                      {user ? (
                                        <h1
                                          className='text-blue'
                                          onClick={() => handleOpenForm(id)}
                                        >
                                          Reply
                                        </h1>
                                      ) : (
                                        <img
                                          src={deleteBtn}
                                          alt=''
                                          onClick={() =>
                                            handleDelete(id, mainitem)
                                          }
                                          // onClick={() => removeitem(id, mainitem)}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* peopeles reply on replied section */}
                          {/* this */}
                          {hideform && formid === id ? (
                            <form
                              onSubmit={(e) =>
                                handleSubmit1(e, id, mainitem, seconditem)
                              }
                              className='bg-white shadow-md rounded-md px-4 py-4 md:py-5 md:px-6  ml-8 md:ml-6 lg:ml-16'
                            >
                              {/* input container */}
                              <div className='space-y-2 md:flex md:justify-between md:items-start md:space-y-0'>
                                {/* image md */}
                                <div className='flex justify-between items-center'>
                                  <img
                                    src={data.currentUser.image.png}
                                    alt=''
                                    className='w-12 hidden md:block'
                                  />
                                </div>
                                {/* input */}
                                <div className='md:w-2/3'>
                                  <textarea
                                    type='text'
                                    placeholder='Add comment here'
                                    value={replyvalue}
                                    onChange={(e) =>
                                      setReplyvalue(e.target.value)
                                    }
                                    className='font-sans text-xs font-light h-20 border rounded-md border-lightGrayishBlue 
                  outline-lightGrayishBlue
                  text-clip w-full px-2 py-1'
                                  ></textarea>
                                </div>
                                {/* image and send */}
                                <div className='flex justify-between items-center'>
                                  <img
                                    src={data.currentUser.image.png}
                                    alt=''
                                    className='w-8 md:hidden'
                                  />
                                  <button
                                    type='submit'
                                    className='px-2 py-1 md:py-2 md:px-4 md:rounded-md bg-blue text-white rounded-sm text-sm font-light'
                                  >
                                    {isEditing ? 'update' : 'Send'}
                                  </button>
                                </div>
                              </div>
                            </form>
                          ) : (
                            ''
                          )}
                          {/* second reply on replies posts*/}
                          {repliedTo ? (
                            <div className='flex-col justify-end'>
                              {/* reply div */}
                              <div className='flex-col space-y-3 justify-end pl-0  '>
                                {/* reply section */}
                                {seconditem.repliedTo.length > 0
                                  ? seconditem.repliedTo.map((item) => {
                                      const {
                                        content,
                                        createdAt,
                                        id,
                                        repliedTo,
                                        score,
                                        user,
                                      } = item
                                      return (
                                        <div className='space-y-2'>
                                          {/* // reply and reply comment */}
                                          <div
                                            key={index}
                                            className='space-y-2'
                                          >
                                            {/* reply */}
                                            <div className='bg-white rounded-md  shadow-md px-4 py-4 md:py-5 md:px-6 md:pr-8   ml-16 md:ml-20 lg:ml-32  '>
                                              {/* large screen  reply  */}
                                              <div className=' flex  justify-between  gap-6'>
                                                {/* rating */}
                                                <div className='hidden md:flex flex-col justify-between px-2 py-3 items-center gap-5 bg-veryLightGray md:w-8 h-auto rounded-md '>
                                                  <img
                                                    src={minus}
                                                    alt=''
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                      handleminus(id)
                                                    }
                                                  />
                                                  <h1 className='font-bold text-lg'>
                                                    {score}
                                                  </h1>
                                                  <img
                                                    src={plus}
                                                    alt=''
                                                    className='cursor-pointer'
                                                    onClick={() =>
                                                      handleplus(id)
                                                    }
                                                  />
                                                </div>
                                                {/* small screen */}
                                                <div className=' space-y-2 md:space-y-4 w-full'>
                                                  {/* header */}
                                                  <div className='flex justify-between place-items-center w-full '>
                                                    <div className='flex items-center justify-start w-full gap-4'>
                                                      <img
                                                        src={
                                                          user
                                                            ? user.image.png
                                                            : data.currentUser
                                                                .image.png
                                                        }
                                                        alt=''
                                                        className='w-10 md:w-12'
                                                      />
                                                      <h1 className='font-sans font-semibold text-sm text-darkBlue md:text-base'>
                                                        {user
                                                          ? user.username
                                                          : data.currentUser
                                                              .username}
                                                      </h1>
                                                      <h1 className='text-xs text-grayishBlue'>
                                                        {createdAt}
                                                      </h1>
                                                    </div>
                                                    {/* reply */}
                                                    <div
                                                      className='md:flex items-center gap-4 hidden cursor-pointer'
                                                      onClick={() =>
                                                        handleOpenForm(id)
                                                      }
                                                    >
                                                      {user ? (
                                                        <img
                                                          src={reply}
                                                          alt=''
                                                        />
                                                      ) : (
                                                        <img
                                                          src={editBtn}
                                                          alt=''
                                                          onClick={() =>
                                                            editItem1(
                                                              id,
                                                              mainitem,
                                                              seconditem
                                                            )
                                                          }
                                                        />
                                                      )}
                                                      {user ? (
                                                        <h1
                                                          className='text-blue'
                                                          onClick={() =>
                                                            handleOpenForm(id)
                                                          }
                                                        >
                                                          Reply
                                                        </h1>
                                                      ) : (
                                                        <img
                                                          src={deleteBtn}
                                                          alt=''
                                                          onClick={() =>
                                                            handleDelete(
                                                              id,
                                                              mainitem,
                                                              seconditem
                                                            )
                                                          }
                                                          // onClick={() =>
                                                          //   removeitem1(
                                                          //     id,
                                                          //     mainitem,
                                                          //     seconditem
                                                          //   )
                                                          // }
                                                        />
                                                      )}
                                                    </div>
                                                  </div>
                                                  {/* text */}
                                                  <div className='w-full'>
                                                    <h1 className='text-xs w-full leading-5 text-grayishBlue md:text-sm'>
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
                                                        onClick={() =>
                                                          handleminus(id)
                                                        }
                                                      />
                                                      <h1 className='font-bold text-base'>
                                                        {score}
                                                      </h1>
                                                      <img
                                                        src={plus}
                                                        alt=''
                                                        className='cursor-pointer'
                                                        onClick={() =>
                                                          handleplus(id)
                                                        }
                                                      />
                                                    </div>
                                                    {/* reply */}
                                                    <div className='flex items-center gap-4 md:hidden cursor-pointer'>
                                                      {user ? (
                                                        <img
                                                          src={reply}
                                                          alt=''
                                                        />
                                                      ) : (
                                                        <img
                                                          src={editBtn}
                                                          alt=''
                                                          onClick={() =>
                                                            editItem1(
                                                              id,
                                                              mainitem,
                                                              seconditem
                                                            )
                                                          }
                                                        />
                                                      )}
                                                      {user ? (
                                                        <h1
                                                          className='text-blue'
                                                          onClick={() =>
                                                            handleOpenForm(id)
                                                          }
                                                        >
                                                          Reply
                                                        </h1>
                                                      ) : (
                                                        <img
                                                          src={deleteBtn}
                                                          alt=''
                                                          onClick={() =>
                                                            handleDelete(
                                                              id,
                                                              mainitem,
                                                              seconditem
                                                            )
                                                          }
                                                          // onClick={() =>
                                                          //   removeitem1(
                                                          //     id,
                                                          //     mainitem,
                                                          //     seconditem
                                                          //   )
                                                          // }
                                                        />
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {/* peopeles reply on replied section */}
                                          {hideform && formid === id ? (
                                            <form
                                              onSubmit={(e) =>
                                                handleSubmit1(
                                                  e,
                                                  id,
                                                  mainitem,
                                                  seconditem
                                                )
                                              }
                                              className='bg-white shadow-md rounded-md px-4 py-4 md:py-5 md:px-6  ml-8 md:ml-6 lg:ml-16'
                                            >
                                              {/* input container */}
                                              <div className='space-y-2 md:flex md:justify-between md:items-start md:space-y-0'>
                                                {/* image md */}
                                                <div className='flex justify-between items-center'>
                                                  <img
                                                    src={
                                                      data.currentUser.image.png
                                                    }
                                                    alt=''
                                                    className='w-12 hidden md:block'
                                                  />
                                                </div>
                                                {/* input */}
                                                <div className='md:w-2/3'>
                                                  <textarea
                                                    type='text'
                                                    placeholder='Add comment here'
                                                    value={replyvalue}
                                                    onChange={(e) =>
                                                      setReplyvalue(
                                                        e.target.value
                                                      )
                                                    }
                                                    className='font-sans text-xs font-light h-20 border rounded-md border-lightGrayishBlue
                                    outline-lightGrayishBlue
                                    text-clip w-full px-2 py-1'
                                                  ></textarea>
                                                </div>
                                                {/* image and send */}
                                                <div className='flex justify-between items-center'>
                                                  <img
                                                    src={
                                                      data.currentUser.image.png
                                                    }
                                                    alt=''
                                                    className='w-8 md:hidden'
                                                  />
                                                  <button
                                                    type='submit'
                                                    className='px-2 py-1 md:py-2 md:px-4 md:rounded-md bg-blue text-white rounded-sm text-sm font-light'
                                                  >
                                                    {isEditing
                                                      ? 'update'
                                                      : 'Send'}
                                                  </button>
                                                </div>
                                              </div>
                                            </form>
                                          ) : (
                                            ''
                                          )}
                                        </div>
                                      )
                                    })
                                  : ''}
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
              </div>
              {/* peopeles reply on post section */}
              {hideform && formid === id ? (
                <form
                  onSubmit={(e) => handleSubmit(e, id, mainitem)}
                  className='bg-white shadow-md rounded-md px-4 py-4 md:py-5 md:px-6 '
                >
                  {/* input container */}
                  <div className='space-y-2 md:flex md:justify-between md:items-start md:space-y-0'>
                    {/* image md */}
                    <div className='flex justify-between items-center'>
                      <img
                        src={data.currentUser.image.png}
                        alt=''
                        className='w-12 hidden md:block'
                      />
                    </div>
                    {/* input */}
                    <div className='md:w-2/3'>
                      <textarea
                        type='text'
                        placeholder='Add comment here'
                        value={replyvalue}
                        onChange={(e) => setReplyvalue(e.target.value)}
                        className='font-sans text-xs font-light h-20 border rounded-md border-lightGrayishBlue 
                  outline-lightGrayishBlue
                  text-clip w-full px-2 py-1'
                      ></textarea>
                    </div>
                    {/* image and send */}
                    <div className='flex justify-between items-center'>
                      <img
                        src={data.currentUser.image.png}
                        alt=''
                        className='w-8 md:hidden'
                      />
                      <button
                        type='submit'
                        className='px-2 py-1 md:py-2 md:px-4 md:rounded-md bg-blue text-white rounded-sm text-sm font-light'
                      >
                        {isEditing ? 'update' : 'Send'}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                ''
              )}
            </div>
          )
        })}
        {/* delete functionality */}
        {modal ? (
          <div className='fixed -top-32 bottom-0 left-0 right-0 z-50 ground bg-black bg-opacity-50  flex justify-center items-center '>
            <div className='bg-white rounded-md px-4 py-6 font-sans max-w-xs md:max-w-sm space-y-4'>
              <h1 className='font-bold text-lg'>Delete comment</h1>
              <h1>
                Are you sure you want to delete this comment ? This will remove
                the comment and can't be undone
              </h1>
              {/* button */}
              <div className='flex justify-center items-center gap-4 text-white '>
                <button
                  className='px-4 py-2 bg-slate-800 rounded-md w-full'
                  onClick={() => setModal(false)}
                >
                  No, Cancel
                </button>
                <button
                  className='px-4 py-2 bg-red-600 rounded-md w-full'
                  onClick={() => deletedinput()}
                >
                  Yes,Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
export default Newwork
