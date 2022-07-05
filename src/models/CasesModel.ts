export class CasesEntity {
    public location: string;
    public date: string;
    public variant: string;
    public num_sequences: string;
    public perc_sequences: string;
    public num_sequences_total: number;

    constructor({
        location = '',
        date = '',
        variant = '',
        num_sequences = '',
        perc_sequences = '',
        num_sequences_total = 0
    }: Partial<CasesEntity>) {
        this.location = location;
        this.date = date;
        this.variant = variant;
        this.num_sequences = num_sequences;
        this.perc_sequences = perc_sequences;
        this.num_sequences_total = num_sequences_total;
    }
}