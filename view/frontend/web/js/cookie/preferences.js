/**
 * Copyright © Open Techiz. All rights reserved.
 * See LICENSE.txt for license details (http://opensource.org/licenses/osl-3.0.php).
 */
require([
    'jquery',
    'jquery-ui-modules/widget',
    'mage/cookies'
], function ($) {
    'use strict';

    $(document).ready(function () {
        const cookiePreferencesElement = '#modal-consent-content';
        
        var cookiePreferencesModal = $(cookiePreferencesElement).modal({
            type: 'popup',
            responsive: false,
            modalClass: 'cookie-preferences-modal',
            innerScroll: true,
            clickableOverlay: true,
            buttons: [
                {
                    text: $.mage.__('Save'),
                    class: 'action primary consent-btn cookie-configure-save'
                },
            ]
        });

        $.ajax({
            url: window.BASE_URL + 'customer/cookie/cookie',
            showLoader: true,
            type: 'POST',
            success: function (data) {
                if (data.checkCookieEnable) {
                    $('.cookie-configure-save').on('click', $.proxy(function () {
                        var preferencesCookie = selectedCookie();
                        var cookieExpires = new Date(new Date().getTime() + data.cookieLifetime * 1000);

                        $.mage.cookies.set(data.cookieName, JSON.stringify(data.cookieValue), {
                            expires: cookieExpires
                        });

                        $.mage.cookies.set('preferences', JSON.stringify(preferencesCookie), {
                            expires: cookieExpires
                        });

                        if ($.mage.cookies.get(data.cookieName)) {
                            $('#gdpr-notice-cookie-block').hide();
                            $(document).trigger('user:allowed:save:cookie');
                            cookiePreferencesModal.modal('closeModal');
                        } else {
                            window.location.href = data.noCookiesUrl;
                        }
                    }, this));
                }
            }
        });

        $(document).on('click', '#gdpr-btn-cookie-config', function () {
            cookiePreferencesModal.modal('openModal');
        });

        $(document).on('click', '.toggle-cookie-consent', function (event) {
            event.preventDefault();
            var group = $(this).parents('.cookie-consent--group');
            $(group).toggleClass('active');
            $(group).find('.cookie-consent--group-items').slideToggle();
        });

        // Fix for modal not closing when clicking overlay on mobile (magento bug)
        $(document).on('click', '.modal-popup.cookie-preferences-modal', function () {
            cookiePreferencesModal.modal('closeModal');
        });

        $(document).on('click', '.cookie-preferences-modal .modal-inner-wrap', function (event) {
            event.stopPropagation();
        });

        $(document).on('change', '.cookie-group-checkbox', function (event) {
            var group = $(this).data('group');
            if ($(this).is(':checked')) {
                $('.cookie-item-checkbox.'+group).attr('checked', true);
            } else {
                $('.cookie-item-checkbox.'+group).attr('checked', false);
            }
            $(this).removeClass('not-full');
        });

        $(document).on('change', '.cookie-item-checkbox', function (event) {
            var group = $(this).data('group');
            $('.cookie-group-checkbox.'+group).removeClass('not-full');
            $('.cookie-group-checkbox.'+group).attr('checked', false);
            if ($('.cookie-item-checkbox.'+group).length == $('.cookie-item-checkbox.'+group+':checked').length) {
                $('.cookie-group-checkbox.'+group).attr('checked', true);
            } else {
                if ($('.cookie-item-checkbox.'+group+':checked').length) {
                    $('.cookie-group-checkbox.'+group).addClass('not-full');
                }
            }
        });

        function selectedCookie () {
            // Create an object to store the data
            var data = {};
            // Loop through all inputs with the name attribute
            $('.cookie-consent-configuration input[type="checkbox"]').each(function() {
                // Split the name attribute into an array
                var nameArray = $(this).attr('name').split('[');
        
                // Get the last element of the array as the key
                var key = nameArray.pop().replace(']', '');
        
                // Get the root element of the array
                var currentObj = data;
        
                // Create nested objects if they don't exist
                nameArray.forEach(function(name) {
                    name = name.replace(']', '');
                    if (!currentObj[name]) {
                        currentObj[name] = {};
                    }
                    currentObj = currentObj[name];
                });
        
                // Assign the value of the input to the object
                currentObj[key] = ($(this).is(':checked') ? 1 : 0);
            });

            return data;
        }
    });
});
