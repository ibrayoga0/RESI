// ==UserScript==
// @name         RESI
// @namespace    http://tampermonkey.net/
// @version      2025-08-14
// @description  Bersih-bersih jejak kaki lu JGRP
// @author       ibraheem
// @match        https://jogjagamers.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jogjagamers.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const toggleBtn = document.createElement('button');
    toggleBtn.title = 'Tampilkan Reset';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '20px';
    toggleBtn.style.right = '20px';
    toggleBtn.style.width = '48px';
    toggleBtn.style.height = '48px';
    toggleBtn.style.backgroundColor = '#2ecc71';
    toggleBtn.style.backgroundImage = 'url("https://www.google.com/s2/favicons?sz=64&domain=jogjagamers.org")';
    toggleBtn.style.backgroundSize = '24px 24px';
    toggleBtn.style.backgroundRepeat = 'no-repeat';
    toggleBtn.style.backgroundPosition = 'center';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '50%';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.zIndex = '9999';
    toggleBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
    toggleBtn.style.opacity = '0.8';
    toggleBtn.style.transition = 'opacity 0.2s, transform 0.3s';
    toggleBtn.onmouseover = () => { toggleBtn.style.opacity = '1'; };
    toggleBtn.onmouseout = () => { toggleBtn.style.opacity = '0.8'; };

    // Tombol Reset (awal disembunyikan)
    const resetBtn = document.createElement('button');
    resetBtn.innerText = 'Reset';
    resetBtn.style.position = 'fixed';
    resetBtn.style.bottom = '80px';
    resetBtn.style.right = '20px';
    resetBtn.style.padding = '10px 15px';
    resetBtn.style.backgroundColor = '#e74c3c';
    resetBtn.style.color = 'white';
    resetBtn.style.border = 'none';
    resetBtn.style.borderRadius = '8px';
    resetBtn.style.cursor = 'pointer';
    resetBtn.style.zIndex = '9999';
    resetBtn.style.fontSize = '14px';
    resetBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
    resetBtn.style.opacity = '0';
    resetBtn.style.pointerEvents = 'none';
    resetBtn.style.transition = 'opacity 0.3s';

    // Fungsi show/hide tombol reset
    let visible = false;
    toggleBtn.addEventListener('click', () => {
        visible = !visible;
        if (visible) {
            resetBtn.style.opacity = '1';
            resetBtn.style.pointerEvents = 'auto';
        } else {
            resetBtn.style.opacity = '0';
            resetBtn.style.pointerEvents = 'none';
        }
    });

    // Fungsi hapus semua data
    resetBtn.addEventListener('click', async () => {
        if (confirm('Reset semua data situs ini?')) {
            // Hapus semua cookie domain ini
            document.cookie.split(";").forEach(cookie => {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            });

            // Hapus localStorage & sessionStorage
            localStorage.clear();
            sessionStorage.clear();

            // Hapus IndexedDB
            if (window.indexedDB) {
                const dbs = await indexedDB.databases();
                dbs.forEach(db => {
                    if (db.name) indexedDB.deleteDatabase(db.name);
                });
            }

            // Reload halaman
            location.reload(true);
        }
    });

    // Masukkan tombol ke halaman
    document.body.appendChild(toggleBtn);
    document.body.appendChild(resetBtn);
})();
