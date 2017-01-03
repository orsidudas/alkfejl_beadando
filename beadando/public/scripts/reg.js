$('#btnRegistration').on('click', function (e) {
  e.preventDefault()

  let $modal = $('.modal')
  const hasModal = $modal.length

  if (hasModal) {
    $modal.modal('show')
    return
  } else {
    $modal = $(`
      <div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="registrationModal">
        <div class="modal-dialog modal-md" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="alert alert-danger"></div>
              <div class="form-area"></div>
            </div>
          </div>
        </div>
      </div>
    `)

    const $formContainer = $modal.find('.form-area')
    const $errorContainer = $modal.find('.alert').hide()

    $formContainer.load('/registration form', function() {
      $modal.modal('show')
      const $registrationForm = $modal.find('form')
      $registrationForm.on('submit', function (e) {
        e.preventDefault()
        $errorContainer.hide()
        const data = $(this).serializeArray()
        Promise.resolve(
          $.ajax({
            url: '/ajax/registration',
            method: 'POST',
            data,
            dataType: 'json',
            headers: { 'csrf-token': $('[name="_csrf"]').val() }
          })
        ).then(json => {
          if (json.success) {
            $('#navbar').load('/ #navbar', function () {
              $modal.modal('hide')
            })
          } else {
            $errorContainer.text('Hibás adatok!').show()
          }
        })
      })
    })
  }
})