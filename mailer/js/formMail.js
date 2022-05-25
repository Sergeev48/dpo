var button = document.getElementById('sendMail')
button.onclick = sendMail
function setColor(element, color) {
  element.style.backgroundColor = color
}
function sendMail() {
  var currentdate = new Date()
  var fullname = document.getElementById('inputFullname').value
  var mail = document.getElementById('inputMail').value.trim()
  var phone = document.getElementById('inputPhone').value.trim()
  var comment = document.getElementById('inputСomment').value
  var time =
    currentdate.getFullYear() +
    '-' +
    (currentdate.getMonth() + 1) +
    '-' +
    currentdate.getDate() +
    ' ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds()

  var time2 =
    currentdate.getFullYear() +
    '-' +
    (currentdate.getMonth() + 1) +
    '-' +
    currentdate.getDate() +
    ' ' +
    (currentdate.getHours() + 1) +
    ':' +
    (currentdate.getMinutes() + 30) +
    ':' +
    currentdate.getSeconds()

  var fio_reg = /[А-я]{1,25} [А-я]{1,25} [А-я]{1,25}/
  var email_reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  var phone_reg = /\+?[0-9]{11}/

  if (!fio_reg.test(fullname)) {
    setColor(document.getElementById('inputFullname'), 'pink')
    document.getElementById('errorMes').innerHTML = 'ошибка'
    return false
  } else {
    setColor(document.getElementById('inputFullname'), 'white')
  }
  if (!email_reg.test(mail)) {
    setColor(document.getElementById('inputMail'), 'pink')
    document.getElementById('errorMes').innerHTML = 'ошибка'
    return false
  } else {
    setColor(document.getElementById('inputMail'), 'white')
  }
  if (!phone_reg.test(phone)) {
    setColor(document.getElementById('inputPhone'), 'pink')
    document.getElementById('errorMes').innerHTML = 'ошибка'
    return false
  } else {
    setColor(document.getElementById('inputPhone'), 'white')
  }
  if (comment == '') {
    setColor(document.getElementById('inputСomment'), 'pink')
    document.getElementById('errorMes').innerHTML = 'ошибка'
    return false
  } else {
    setColor(document.getElementById('inputСomment'), 'white')
  }

  document.getElementById('errorMes').innerHTML = ''

  $(document).ready(function () {
    $.ajax({
      type: 'POST',
      url: './mail.php',
      cache: false,
      data: {
        fullname: fullname,
        mail: mail,
        phone: phone,
        comment: comment,
        time: time,
      },
      dataType: 'text',
      beforeSend: function () {
        $('#sendMail').prop('disabled', true)
      },
      success: function () {
        document.getElementById('form').style.visibility = 'hidden'
        document.getElementById('form2').style.visibility = 'visible'
        document.getElementById('form2').style.position = 'fixed'
        document.getElementById('fullname').innerHTML = fullname
        document.getElementById('mail').innerHTML = mail
        document.getElementById('phone').innerHTML = phone
        document.getElementById('comment').innerHTML = comment
        document.getElementById('curtime').innerHTML =
          'С Вами свяжутся после ' + time2
      },
    })
  })
}
