export default {
  formatCurrency: function(value) {
    return Number((value).toFixed(2)).toLocaleString('de-DE', {style : 'currency', currency : 'VND'})
  },
  formatRating: function(value) {
    return Number.parseFloat(value).toFixed(2);
  }
}